<template>
  <v-container fluid class="home-shell pa-4 pa-md-6">
    <header class="repo-header mb-6">
      <div class="repo-path">
        <v-icon size="18" class="repo-path-icon">mdi-source-repository</v-icon>
        <span class="repo-owner">intelite</span>
        <span class="repo-sep">/</span>
        <span class="repo-name">hub</span>
        <span class="repo-badge">Public</span>
      </div>
      <h1 class="page-title">Repositório Intelite</h1>
      <p class="page-description">
        Conteúdo sincronizado do
        <a
          class="drive-link"
          href="https://drive.google.com/drive/folders/1cQk7FC72LXgX3Bd4ReCtigQIx1Ij8eSg?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
        >Google Drive INTELITEHUB</a>
        — pastas <strong>TUTORIAIS</strong>, <strong>APKS</strong>,
        <strong>MENSAGENS RÁPIDAS</strong> e <strong>LINKS</strong>.
      </p>
      <div class="repo-meta">
        <span
          v-for="col in columns"
          :key="`meta-${col.value}`"
          class="meta-chip"
        >
          <v-icon size="14" :style="{ color: col.accent }">{{ col.icon }}</v-icon>
          {{ col.title }}
          <strong>{{ leafCounts[col.value] || 0 }}</strong>
        </span>
        <button
          type="button"
          class="meta-chip meta-refresh"
          :disabled="loading"
          @click="loadColumns"
        >
          <v-icon size="14">mdi-refresh</v-icon>
          Atualizar
        </button>
      </div>
      <p v-if="statusNote" class="status-note">{{ statusNote }}</p>
    </header>

    <div v-if="loading" class="state-box">
      <v-progress-circular indeterminate color="primary" size="36" width="3" />
      <span>Carregando pastas do Google Drive…</span>
    </div>

    <v-alert
      v-else-if="error"
      type="error"
      variant="tonal"
      class="mb-4"
      border="start"
    >
      {{ error }}
    </v-alert>

    <v-row v-else>
      <v-col
        v-for="(col, index) in columns"
        :key="col.value"
        cols="12"
        sm="6"
        lg="3"
        class="repo-col"
        :style="{ '--stagger': `${index * 60}ms`, '--accent': col.accent }"
      >
        <v-card
          variant="outlined"
          rounded="lg"
          class="tree-card tree-card-github"
        >
          <v-card-title class="card-header-github d-flex align-center ga-2">
            <span class="header-accent" aria-hidden="true" />
            <v-icon size="18" :style="{ color: col.accent }">
              {{ col.icon }}
            </v-icon>
            <span class="header-title">{{ col.title }}</span>
            <v-spacer />
            <span class="item-count">{{ leafCounts[col.value] || 0 }}</span>
          </v-card-title>
          <v-divider class="border-opacity-25" />
          <v-card-text class="pa-0 card-body-github">
            <div v-if="!col.children?.length" class="empty-folder">
              <v-icon size="28" class="mb-2">mdi-folder-open-outline</v-icon>
              <p>Pasta vazia</p>
              <span>Adicione itens na pasta correspondente no Google Drive</span>
            </div>
            <v-treeview
              v-else
              :items="[col]"
              item-value="value"
              item-title="title"
              item-children="children"
              activatable
              open-on-click
              density="comfortable"
              class="tree-view tree-view-github"
              variant="plain"
              color="primary"
            >
              <template #prepend="{ item }">
                <v-icon size="small" class="mr-2 tree-icon">
                  {{ itemIcon(item) }}
                </v-icon>
              </template>
              <template #title="{ item }">
                <button
                  v-if="item.type === 'message' && item.text"
                  type="button"
                  class="tree-action"
                  :title="'Copiar: ' + item.title"
                  @click.stop="copyMessage(item)"
                >
                  <span class="tree-link">{{ item.title }}</span>
                  <v-icon size="14" class="action-hint">mdi-content-copy</v-icon>
                </button>
                <a
                  v-else-if="item.link"
                  :href="item.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="tree-link"
                  @click.stop
                >
                  {{ item.title }}
                </a>
                <span v-else class="tree-label">{{ item.title }}</span>
              </template>
            </v-treeview>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar.show"
      :timeout="2200"
      color="#21262d"
      location="bottom"
      class="copy-snack"
    >
      <div class="d-flex align-center ga-2">
        <v-icon size="18" color="#3fb950">mdi-check-circle</v-icon>
        <span>{{ snackbar.text }}</span>
      </div>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  countLeaves,
  emptyColumns,
  loadRepoColumns,
} from '../services/googleDrive'

const columns = ref(emptyColumns())
const loading = ref(true)
const error = ref('')
const statusNote = ref('')

const snackbar = reactive({
  show: false,
  text: '',
})

const leafCounts = computed(() =>
  Object.fromEntries(
    columns.value.map((col) => [col.value, countLeaves(col)])
  )
)

function itemIcon(item) {
  if (item.type === 'apk') return 'mdi-download'
  if (item.type === 'video') return 'mdi-play-box-outline'
  if (item.type === 'message') return 'mdi-message-outline'
  if (item.type === 'link') return 'mdi-open-in-new'
  if (item.link || item.text) return 'mdi-file-outline'
  return 'mdi-folder-outline'
}

async function copyMessage(item) {
  try {
    await navigator.clipboard.writeText(item.text)
    snackbar.text = `“${item.title}” copiada`
    snackbar.show = true
  } catch {
    snackbar.text = 'Não foi possível copiar'
    snackbar.show = true
  }
}

async function loadColumns() {
  loading.value = true
  error.value = ''
  statusNote.value = ''
  try {
    const result = await loadRepoColumns()
    columns.value = result.columns
    if (result.leafTotal === 0) {
      statusNote.value =
        'Nenhum arquivo nas pastas TUTORIAIS, APKS, MENSAGENS RÁPIDAS ou LINKS ainda.'
    } else {
      statusNote.value = `${result.leafTotal} item(ns) carregado(s) do Google Drive.`
    }
  } catch (err) {
    columns.value = emptyColumns()
    error.value =
      err?.message ||
      'Não foi possível ler o Google Drive. Confirme que a pasta está pública (“qualquer pessoa com o link”).'
  } finally {
    loading.value = false
  }
}

onMounted(loadColumns)
</script>

<style scoped>
.home-shell {
  max-width: 1400px;
  margin-inline: auto;
}

.repo-header {
  text-align: left;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #21262d;
  animation: fade-up 0.45s ease both;
}

.repo-path {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
}

.repo-path-icon {
  color: #8b949e;
}

.repo-owner {
  color: #58a6ff;
  font-weight: 500;
}

.repo-sep {
  color: #8b949e;
}

.repo-name {
  color: #e6edf3;
  font-weight: 600;
  font-family: 'Mona Sans Variable', 'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.repo-badge {
  margin-left: 0.35rem;
  padding: 0.1rem 0.5rem;
  border: 1px solid #30363d;
  border-radius: 999px;
  color: #8b949e;
  font-size: 0.75rem;
  font-weight: 500;
}

.page-title {
  color: #e6edf3;
  font-size: clamp(1.35rem, 2.5vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  font-family: 'Mona Sans Variable', 'Mona Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  margin: 0 0 0.4rem;
}

.page-description {
  color: #8b949e;
  font-size: 0.9375rem;
  line-height: 1.55;
  max-width: 46rem;
  margin: 0 0 1rem;
}

.page-description strong {
  color: #c9d1d9;
  font-weight: 600;
}

.drive-link {
  color: #58a6ff;
  text-decoration: none;
}

.drive-link:hover {
  text-decoration: underline;
  color: #79b8ff;
}

.repo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.meta-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.65rem;
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 999px;
  color: #8b949e;
  font-size: 0.75rem;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.meta-chip:hover {
  border-color: #484f58;
  background: #1c2128;
}

.meta-chip strong {
  color: #c9d1d9;
  font-weight: 600;
}

.meta-refresh {
  cursor: pointer;
  font: inherit;
}

.meta-refresh:disabled {
  opacity: 0.5;
  cursor: default;
}

.status-note {
  margin: 0.85rem 0 0;
  color: #8b949e;
  font-size: 0.8125rem;
  line-height: 1.45;
}

.state-box {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  min-height: 220px;
  color: #8b949e;
  font-size: 0.9375rem;
}

.repo-col {
  animation: fade-up 0.5s ease both;
  animation-delay: var(--stagger, 0ms);
}

.tree-card {
  height: 100%;
  min-height: 420px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition:
    border-color 0.22s ease,
    box-shadow 0.22s ease,
    transform 0.22s ease;
}

.tree-card-github {
  background: #161b22 !important;
  border-color: #30363d !important;
}

.tree-card:hover {
  border-color: #484f58 !important;
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent, #58a6ff) 28%, transparent);
  transform: translateY(-2px);
}

.card-header-github {
  position: relative;
  background: linear-gradient(180deg, #1c2128 0%, #161b22 100%) !important;
  color: #e6edf3 !important;
  font-weight: 600;
  font-size: 0.875rem;
  padding: 12px 14px !important;
  overflow: hidden;
}

.header-accent {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent, #58a6ff);
}

.header-title {
  letter-spacing: -0.01em;
}

.item-count {
  min-width: 1.5rem;
  height: 1.5rem;
  padding: 0 0.4rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #21262d;
  border: 1px solid #30363d;
  color: #8b949e;
  font-size: 0.75rem;
  font-weight: 600;
}

.card-body-github {
  background: #161b22 !important;
  flex: 1;
}

.empty-folder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 340px;
  padding: 1.5rem;
  text-align: center;
  color: #8b949e;
}

.empty-folder p {
  margin: 0 0 0.35rem;
  color: #c9d1d9;
  font-weight: 500;
}

.empty-folder span {
  font-size: 0.8125rem;
  max-width: 16rem;
  line-height: 1.4;
}

.tree-view {
  min-height: 340px;
}

.tree-view-github :deep(.v-treeview-item) {
  color: #c9d1d9;
  border-radius: 6px;
  margin: 1px 6px;
  transition: background 0.15s ease;
}

.tree-view-github :deep(.v-treeview-item:hover) {
  background: rgba(177, 186, 196, 0.08);
}

.tree-icon {
  color: #8b949e !important;
}

.tree-label {
  color: #c9d1d9;
}

.tree-link {
  color: #58a6ff;
  text-decoration: none;
  font-weight: 400;
}

.tree-link:hover {
  text-decoration: underline;
  color: #79b8ff;
}

.tree-action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  max-width: 100%;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
}

.action-hint {
  color: #484f58;
  opacity: 0;
  transition: opacity 0.15s ease, color 0.15s ease;
}

.tree-action:hover .action-hint {
  opacity: 1;
  color: #8b949e;
}

:deep(.v-treeview-item) {
  min-height: 38px;
}

:deep(.v-treeview-item--active) {
  background: rgba(56, 139, 253, 0.12) !important;
  color: #58a6ff;
}

:deep(.v-treeview-group__items) {
  padding-left: 14px;
}

:deep(.v-divider) {
  border-color: #30363d !important;
}

.copy-snack :deep(.v-snackbar__content) {
  color: #e6edf3;
  font-size: 0.875rem;
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .repo-header,
  .repo-col,
  .tree-card {
    animation: none;
    transition: none;
  }

  .tree-card:hover {
    transform: none;
  }
}
</style>
