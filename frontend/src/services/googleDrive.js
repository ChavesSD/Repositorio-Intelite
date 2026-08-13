import { APP_CONFIG } from '../config/appConfig'

const { rootFolderId, blocks } = APP_CONFIG.googleDrive

const FOLDER_MIME_HINT = /\/folders\//i
const FILE_VIEW_HINT = /\/file\/d\//i

function normalizeKey(name) {
  return String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function matchBlock(folderName) {
  const key = normalizeKey(folderName)
  return blocks.find((block) =>
    block.folderNames.some((name) => normalizeKey(name) === key)
  )
}

function detectType(fileName, href, defaultType) {
  const lower = String(fileName || '').toLowerCase()
  if (lower.endsWith('.apk')) return 'apk'
  if (/\.(mp4|webm|mkv|mov|avi)$/i.test(lower)) return 'video'
  if (/\.(txt|md|csv)$/i.test(lower)) return 'message'
  if (/\.(url|html|htm)$/i.test(lower)) return 'link'
  if (/docs\.google\.com\/document/i.test(href || '')) return 'message'
  if (/docs\.google\.com\/spreadsheets|forms|presentation/i.test(href || '')) {
    return 'link'
  }
  return defaultType
}

function decodeHtmlEntities(text) {
  if (typeof document !== 'undefined') {
    const el = document.createElement('textarea')
    el.innerHTML = text
    return el.value
  }
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

/** Lista itens de uma pasta pública via proxy (embeddedfolderview). */
export async function listDriveFolder(folderId) {
  const res = await fetch(`/api/drive-folder/${encodeURIComponent(folderId)}`)
  if (!res.ok) {
    throw new Error(`Falha ao ler pasta do Drive (${res.status})`)
  }
  const html = await res.text()
  return parseEmbeddedFolder(html)
}

export function parseEmbeddedFolder(html) {
  const entries = []
  const rx =
    /<div class="flip-entry" id="entry-([^"]+)"[\s\S]*?<a href="([^"]+)"[\s\S]*?<div class="flip-entry-title">([^<]*)<\/div>/gi

  let match
  while ((match = rx.exec(html)) !== null) {
    const id = match[1]
    const href = match[2]
    const title = decodeHtmlEntities(match[3]).trim()
    if (!id || !title) continue

    const isFolder = FOLDER_MIME_HINT.test(href) && !FILE_VIEW_HINT.test(href)
    entries.push({
      id,
      title,
      href,
      isFolder,
    })
  }

  return entries
}

async function readDriveText(fileId) {
  try {
    const res = await fetch(`/api/drive-file/${encodeURIComponent(fileId)}`)
    if (!res.ok) return ''
    const text = (await res.text()).trim()
    // Google às vezes devolve HTML de confirmação de download
    if (!text || text.startsWith('<!DOCTYPE') || text.startsWith('<html')) {
      return ''
    }
    return text
  } catch {
    return ''
  }
}

function parseInternetShortcut(text) {
  const match = text.match(/^\s*URL\s*=\s*(.+)\s*$/im)
  return match ? match[1].trim() : ''
}

function firstUrlInText(text) {
  const match = String(text).match(/https?:\/\/[^\s<>"']+/i)
  return match ? match[0] : ''
}

async function enrichLeaf(node, entry, type) {
  if (type === 'message') {
    const text = await readDriveText(entry.id)
    if (text) {
      const maybeUrl = firstUrlInText(text)
      // Se o “texto” for só um link, trata como link
      if (maybeUrl && maybeUrl === text.trim()) {
        node.link = maybeUrl
        node.type = 'link'
      } else {
        node.text = text
        node.type = 'message'
      }
      return
    }
  }

  if (type === 'link') {
    const lower = entry.title.toLowerCase()
    if (/\.(url|txt|md)$/i.test(lower)) {
      const text = await readDriveText(entry.id)
      const href = lower.endsWith('.url')
        ? parseInternetShortcut(text)
        : firstUrlInText(text) || text
      if (href && /^https?:\/\//i.test(href)) {
        node.link = href
        node.type = 'link'
        return
      }
    }
  }

  node.link = entry.href
}

async function buildTreeFromFolder(folderId, defaultType, visited) {
  if (visited.has(folderId)) return []
  visited.add(folderId)

  const entries = await listDriveFolder(folderId)
  const nodes = []

  for (const entry of entries) {
    if (entry.isFolder) {
      const children = await buildTreeFromFolder(entry.id, defaultType, visited)
      nodes.push({
        value: `dir:${entry.id}`,
        title: entry.title,
        children,
      })
      continue
    }

    const type = detectType(entry.title, entry.href, defaultType)
    const node = {
      value: `file:${entry.id}`,
      title: entry.title,
      type,
    }
    await enrichLeaf(node, entry, type)
    nodes.push(node)
  }

  nodes.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
  return nodes
}

/**
 * Lê a pasta INTELITEHUB e monta os 4 blocos a partir das pastas
 * TUTORIAIS, APKS, MENSAGENS RÁPIDAS e LINKS.
 */
export async function loadRepoColumns() {
  const visited = new Set()
  const rootEntries = await listDriveFolder(rootFolderId)
  visited.add(rootFolderId)

  const columns = blocks.map((block) => ({
    value: block.value,
    title: block.title,
    icon: block.icon,
    accent: block.accent,
    children: [],
  }))

  const columnByValue = Object.fromEntries(columns.map((c) => [c.value, c]))

  for (const entry of rootEntries) {
    if (!entry.isFolder) continue
    const block = matchBlock(entry.title)
    if (!block) continue

    columnByValue[block.value].children = await buildTreeFromFolder(
      entry.id,
      block.defaultType,
      visited
    )
  }

  const leafTotal = columns.reduce((sum, col) => sum + countLeaves(col), 0)

  return {
    columns,
    folderId: rootFolderId,
    rootCount: rootEntries.length,
    leafTotal,
  }
}

export function countLeaves(node) {
  if (!node?.children?.length) {
    return node?.link || node?.text ? 1 : 0
  }
  return node.children.reduce((sum, child) => sum + countLeaves(child), 0)
}

export function emptyColumns() {
  return blocks.map((block) => ({
    value: block.value,
    title: block.title,
    icon: block.icon,
    accent: block.accent,
    children: [],
  }))
}
