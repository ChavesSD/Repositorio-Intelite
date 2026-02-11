<template>
  <v-container fluid class="pa-4 admin-page">
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="admin-title">Admin — Editar árvores</h1>
      <v-btn
        variant="text"
        color="primary"
        to="/"
        class="admin-back"
      >
        <v-icon start>mdi-arrow-left</v-icon>
        Voltar
      </v-btn>
    </div>

    <p class="admin-desc mb-4">
      Gerencie até 4 colunas e, dentro de cada uma, pastas, subpastas e links de redirecionamento.
      As alterações são salvas localmente e, se configurado, também no backend.
    </p>

    <div class="admin-columns-header mb-4">
      <div class="admin-columns-info">
        Colunas atuais: {{ columns.length }} / 4
      </div>
      <v-btn
        color="primary"
        variant="outlined"
        size="small"
        :disabled="columns.length >= 4"
        @click="addColumn"
      >
        <v-icon start>mdi-plus</v-icon>
        Adicionar coluna
      </v-btn>
    </div>

    <v-row>
      <v-col
        v-for="(col, colIndex) in columns"
        :key="col.value || colIndex"
        cols="12"
        :md="columnMd"
      >
        <v-card variant="outlined" rounded="lg" class="admin-card">
          <v-card-title class="card-header-github d-flex align-center justify-space-between">
            <div class="d-flex align-center gap-2">
              <v-icon start size="small">mdi-folder</v-icon>
              <v-text-field
                v-model="col.title"
                label="Nome da coluna"
                density="compact"
                variant="outlined"
                hide-details
                class="admin-field admin-column-title"
              />
            </div>
            <v-btn
              icon
              size="small"
              variant="text"
              color="error"
              @click="removeColumn(colIndex)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider class="border-opacity-25" />
          <v-card-text class="admin-card-body">
            <div class="admin-section">
              <div class="admin-actions-row mb-2">
                <v-btn
                  size="small"
                  variant="outlined"
                  @click="addFolder(col)"
                >
                  <v-icon start>mdi-folder-plus</v-icon>
                  Adicionar pasta na raiz
                </v-btn>
              </div>

              <div
                v-for="(item, index) in col.children || []"
                :key="item.value || index"
                class="admin-item-root"
              >
                <AdminNodeEditor
                  :node="item"
                  :depth="0"
                  @delete-node="() => removeChild(col, index)"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div class="admin-actions">
      <v-btn color="primary" variant="flat" @click="save">
        <v-icon start>mdi-content-save</v-icon>
        Salvar alterações
      </v-btn>
      <v-btn variant="outlined" color="grey" class="ml-4" @click="resetToDefault">
        Restaurar padrão
      </v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTreeStore } from '../composables/useTreeStore'
import AdminNodeEditor from '../components/AdminNodeEditor.vue'

const { columns, save, resetToDefault, loadFromBackend } = useTreeStore()

const columnMd = computed(() => {
  const n = Math.min(columns.value.length || 1, 4)
  return 12 / n
})

function addColumn () {
  if (columns.value.length >= 4) return
  columns.value.push({
    value: `col-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: 'Nova coluna',
    children: [],
  })
}

function removeColumn (index) {
  columns.value.splice(index, 1)
}

function addFolder (parent) {
  if (!Array.isArray(parent.children)) {
    parent.children = []
  }
  parent.children.push({
    value: `folder-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: 'Nova pasta',
    children: [],
  })
}

function removeChild (parent, index) {
  if (!Array.isArray(parent.children)) return
  parent.children.splice(index, 1)
}

onMounted(() => {
  loadFromBackend()
})
</script>

<style scoped>
.admin-page {
  max-width: 1200px;
  margin: 0 auto;
}

.admin-title {
  color: #c9d1d9;
  font-size: 1.5rem;
  font-weight: 600;
}

.admin-back {
  color: #ffffff !important;
  font-weight: 700;
}

.admin-desc {
  color: #8b949e;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.admin-columns-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.admin-columns-info {
  color: #8b949e;
  font-size: 0.875rem;
}

.admin-card {
  background: #161b22 !important;
  border-color: #30363d !important;
}

.card-header-github {
  background: #21262d !important;
  color: #c9d1d9 !important;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 12px 16px;
}

.admin-card-body {
  background: #161b22 !important;
  padding: 16px !important;
}

.admin-column-title :deep(.v-field) {
  background: #0d1117 !important;
  border-color: #30363d !important;
}

.admin-column-title {
  flex: 1 1 320px;
}

.admin-section {
  margin-bottom: 24px;
}

.admin-section:last-child {
  margin-bottom: 0;
}

.admin-category-title {
  color: #c9d1d9;
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 12px;
  padding-bottom: 4px;
  border-bottom: 1px solid #30363d;
}

.admin-item-row {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.admin-field {
  margin-bottom: 0;
}

.admin-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #30363d;
}

:deep(.v-divider) {
  border-color: #30363d !important;
}
</style>

