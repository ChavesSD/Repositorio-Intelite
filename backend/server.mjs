import express from 'express'
import cors from 'cors'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MongoClient } from 'mongodb'

// Resolve __dirname em ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

// Configuração MongoDB via variáveis de ambiente
const MONGO_URI = process.env.MONGO_URI || ''
const MONGO_DB = process.env.MONGO_DB || 'intelitehub'
const MONGO_COLLECTION = process.env.MONGO_COLLECTION || 'trees'

let mongoClient
let treesCollection

async function getTreesCollection () {
  if (!MONGO_URI) return null
  if (treesCollection) return treesCollection

  try {
    mongoClient = new MongoClient(MONGO_URI)
    await mongoClient.connect()
    const db = mongoClient.db(MONGO_DB)
    treesCollection = db.collection(MONGO_COLLECTION)
    console.log('[MongoDB] Conectado com sucesso')
    return treesCollection
  } catch (err) {
    console.error('[MongoDB] Falha ao conectar, caindo para arquivo JSON', err)
    treesCollection = null
    return null
  }
}

// Caminho do arquivo de dados (JSON) dentro do repositório (fallback)
const dataPath = path.resolve(__dirname, 'data', 'trees.json')

// Middleware
app.use(cors())
app.use(express.json())

// Normaliza estruturas antigas { tutoriais, apks } para o novo formato { columns }
function normalizeTrees (raw) {
  if (!raw || typeof raw !== 'object') {
    return { columns: [] }
  }

  // Novo formato já normalizado
  if (Array.isArray(raw.columns)) {
    return { columns: raw.columns }
  }

  // Formato legado com tutoriais/apks separados
  const columns = []
  if (Array.isArray(raw.tutoriais)) {
    columns.push(...raw.tutoriais)
  }
  if (Array.isArray(raw.apks)) {
    columns.push(...raw.apks)
  }

  return { columns }
}

// Leitura a partir do arquivo JSON (fallback)
async function readTreesFromFile () {
  try {
    const raw = await fs.readFile(dataPath, 'utf-8')
    const parsed = JSON.parse(raw)
    return normalizeTrees(parsed)
  } catch (err) {
    // Se o arquivo não existir ou estiver inválido, retorna estrutura vazia
    return { columns: [] }
  }
}

// Escrita no arquivo JSON (fallback)
async function writeTreesToFile (payload) {
  const normalized = normalizeTrees(payload)
  await fs.mkdir(path.dirname(dataPath), { recursive: true })
  await fs.writeFile(dataPath, JSON.stringify(normalized, null, 2), 'utf-8')
}

// Leitura principal: tenta MongoDB, se falhar usa arquivo
async function readTrees () {
  const col = await getTreesCollection()
  if (col) {
    const doc = await col.findOne({ _id: 'trees' })
    if (doc && doc.data) {
      return normalizeTrees(doc.data)
    }
  }
  return readTreesFromFile()
}

// Escrita principal: tenta MongoDB, sempre salva também no arquivo como backup
async function writeTrees (payload) {
  const normalized = normalizeTrees(payload)
  const col = await getTreesCollection()
  if (col) {
    await col.updateOne(
      { _id: 'trees' },
      { $set: { data: normalized, updatedAt: new Date() } },
      { upsert: true },
    )
  }

  // Backup em arquivo JSON
  await writeTreesToFile(normalized)
}

// GET /api/trees -> retorna estrutura atual { columns: [...] }
app.get('/api/trees', async (req, res) => {
  try {
    const trees = await readTrees()
    res.json(trees)
  } catch (err) {
    console.error('Erro ao ler trees.json', err)
    res.status(500).json({ message: 'Erro ao carregar estrutura de pastas.' })
  }
})

// PUT /api/trees -> substitui estrutura completa (columns)
app.put('/api/trees', async (req, res) => {
  const body = req.body || {}
  const normalized = normalizeTrees(body)

  if (!Array.isArray(normalized.columns)) {
    return res.status(400).json({
      message: 'Payload inválido. Esperado { columns: [] }.'
    })
  }

  try {
    await writeTrees(normalized)
    res.status(200).json({ message: 'Estrutura atualizada com sucesso.' })
  } catch (err) {
    console.error('Erro ao salvar trees.json', err)
    res.status(500).json({ message: 'Erro ao salvar estrutura de pastas.' })
  }
})

// Endpoint simples de health-check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'intelitehub-backend' })
})

app.listen(PORT, () => {
  console.log(`Backend intelitehub rodando em http://localhost:${PORT}`)
})

