import { ref } from 'vue'
import { columns as defaultColumns } from '../data/treeData'

const STORAGE_KEY = 'intelitehub-columns'
const API_BASE = import.meta.env.VITE_API_BASE || ''

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function normalize (raw) {
  if (!raw || typeof raw !== 'object') return { columns: [] }
  if (Array.isArray(raw.columns)) return { columns: raw.columns }

  // compatibilidade com formato antigo { tutoriais, apks }
  const cols = []
  if (Array.isArray(raw.tutoriais)) cols.push(...raw.tutoriais)
  if (Array.isArray(raw.apks)) cols.push(...raw.apks)
  return { columns: cols }
}

function loadFromStorage () {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      return normalize(JSON.parse(raw))
    }
  } catch (_) {}
  return null
}

const stored = typeof window !== 'undefined' ? loadFromStorage() : null
const columns = ref(stored ? stored.columns : deepClone(defaultColumns))

export function useTreeStore () {
  function saveToLocalStorage () {
    try {
      if (typeof window === 'undefined') return true
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ columns: columns.value }))
      return true
    } catch (_) {
      return false
    }
  }

  async function save () {
    const payload = { columns: columns.value }

    const okLocal = saveToLocalStorage()
    let okBackend = true

    if (API_BASE) {
      try {
        const res = await fetch(`${API_BASE}/api/trees`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        okBackend = res.ok
      } catch (_) {
        okBackend = false
      }
    }

    return okLocal && okBackend
  }

  async function resetToDefault () {
    columns.value = deepClone(defaultColumns)
    await save()
  }

  async function loadFromBackend () {
    if (!API_BASE) return false

    try {
      const res = await fetch(`${API_BASE}/api/trees`)
      if (!res.ok) return false
      const data = normalize(await res.json())

      if (!Array.isArray(data.columns)) {
        return false
      }

      columns.value = data.columns
      saveToLocalStorage()
      return true
    } catch (_) {
      return false
    }
  }

  return {
    columns,
    save,
    resetToDefault,
    loadFromBackend,
  }
}

