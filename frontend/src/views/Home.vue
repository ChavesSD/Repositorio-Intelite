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
      </p>
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

    <v-expansion-panels
      v-else
      v-model="openPanels"
      multiple
      class="repo-panels"
    >
      <v-expansion-panel
        v-for="(col, index) in columns"
        :key="col.value"
        :value="col.value"
        class="repo-panel"
        :style="{ '--stagger': `${index * 50}ms`, '--accent': col.accent }"
      >
        <v-expansion-panel-title class="panel-header">
          <span class="header-accent" aria-hidden="true" />
          <v-icon size="18" class="mr-2" :style="{ color: col.accent }">
            {{ col.icon }}
          </v-icon>
          <span class="header-title">{{ col.title }}</span>
          <v-spacer />
          <span class="item-count">{{ leafCounts[col.value] || 0 }}</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text class="panel-body">
          <div v-if="!col.children?.length" class="empty-folder">
            <v-icon size="28" class="mb-2">mdi-folder-open-outline</v-icon>
            <p>Pasta vazia</p>
            <span>{{ emptyHint(col) }}</span>
          </div>
          <ul v-else-if="col.value === 'links'" class="link-list">
            <template v-for="item in col.children" :key="item.value">
              <li v-if="item.children?.length" class="link-folder">
                <button
                  type="button"
                  class="link-folder-toggle"
                  @click="toggleLinkFolder(item.value)"
                >
                  <v-icon size="small" class="tree-icon mr-2">
                    {{ isLinkFolderOpen(item.value) ? 'mdi-folder-open-outline' : 'mdi-folder-outline' }}
                  </v-icon>
                  <span class="link-title">{{ item.title }}</span>
                  <span class="item-count folder-count">{{ item.children.length }}</span>
                  <v-icon size="18" class="folder-chevron">
                    {{ isLinkFolderOpen(item.value) ? 'mdi-chevron-down' : 'mdi-chevron-right' }}
                  </v-icon>
                </button>
                <ul v-show="isLinkFolderOpen(item.value)" class="link-list nested">
                  <li
                    v-for="child in item.children"
                    :key="child.value"
                    class="link-row"
                  >
                    <v-icon size="small" class="tree-icon mr-2">mdi-link-variant</v-icon>
                    <div class="link-info">
                      <span class="link-title">{{ child.title }}</span>
                      <span class="link-url">{{ child.link }}</span>
                    </div>
                    <div class="link-actions">
                      <a
                        :href="child.link"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link-btn"
                        title="Abrir em nova aba"
                      >
                        <v-icon size="16">mdi-open-in-new</v-icon>
                        Abrir
                      </a>
                      <button
                        type="button"
                        class="link-btn"
                        title="Copiar URL"
                        @click="copyLink(child)"
                      >
                        <v-icon size="16">mdi-content-copy</v-icon>
                        Copiar
                      </button>
                    </div>
                  </li>
                </ul>
              </li>
              <li v-else class="link-row">
                <v-icon size="small" class="tree-icon mr-2">mdi-link-variant</v-icon>
                <div class="link-info">
                  <span class="link-title">{{ item.title }}</span>
                  <span class="link-url">{{ item.link }}</span>
                </div>
                <div class="link-actions">
                  <a
                    :href="item.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-btn"
                    title="Abrir em nova aba"
                  >
                    <v-icon size="16">mdi-open-in-new</v-icon>
                    Abrir
                  </a>
                  <button
                    type="button"
                    class="link-btn"
                    title="Copiar URL"
                    @click="copyLink(item)"
                  >
                    <v-icon size="16">mdi-content-copy</v-icon>
                    Copiar
                  </button>
                </div>
              </li>
            </template>
          </ul>
          <ul v-else-if="col.value === 'mensagens'" class="link-list">
            <li
              v-for="item in col.children"
              :key="item.value"
              class="link-row message-row"
            >
              <v-icon size="small" class="tree-icon mr-2">mdi-message-outline</v-icon>
              <div class="link-info">
                <span class="link-title">{{ item.title }}</span>
                <span class="link-url message-preview">{{ item.text }}</span>
              </div>
              <div class="link-actions">
                <button
                  type="button"
                  class="link-btn"
                  title="Copiar mensagem"
                  @click="copyMessage(item)"
                >
                  <v-icon size="16">mdi-content-copy</v-icon>
                  Copiar
                </button>
              </div>
            </li>
          </ul>
          <v-treeview
            v-else
            :items="col.children"
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
              <a
                v-if="item.link"
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
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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
const openPanels = ref([])

const snackbar = reactive({
  show: false,
  text: '',
})

const openLinkFolders = reactive({})

function isLinkFolderOpen(value) {
  return openLinkFolders[value] !== false
}

function toggleLinkFolder(value) {
  openLinkFolders[value] = !isLinkFolderOpen(value)
}

const leafCounts = computed(() =>
  Object.fromEntries(
    columns.value.map((col) => [col.value, countLeaves(col)])
  )
)

function itemIcon(item) {
  if (item.type === 'apk') return 'mdi-download'
  if (item.type === 'video') return 'mdi-play-box-outline'
  if (item.type === 'image') return 'mdi-file-image-outline'
  if (item.type === 'document') return 'mdi-file-document-outline'
  if (item.type === 'message') return 'mdi-message-outline'
  if (item.type === 'link') return 'mdi-open-in-new'
  if (item.link || item.text) return 'mdi-file-outline'
  return 'mdi-folder-outline'
}

function emptyHint(col) {
  if (col.value === 'links') return 'Nenhum link configurado'
  if (col.value === 'mensagens') return 'Nenhuma mensagem configurada ainda'
  return 'Adicione itens na pasta correspondente no Google Drive'
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

async function copyLink(item) {
  try {
    await navigator.clipboard.writeText(item.link)
    snackbar.text = `URL de “${item.title}” copiada`
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
        'Nenhum arquivo nas pastas do hub ainda.'
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
  margin: 0;
}

.drive-link {
  color: #58a6ff;
  text-decoration: none;
}

.drive-link:hover {
  text-decoration: underline;
  color: #79b8ff;
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

.repo-panels {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.repo-panels :deep(.v-expansion-panel) {
  background: #161b22;
  border: 1px solid #30363d;
  border-radius: 8px !important;
  overflow: hidden;
  animation: fade-up 0.45s ease both;
  animation-delay: var(--stagger, 0ms);
}

.repo-panels :deep(.v-expansion-panel::after) {
  display: none;
}

.repo-panels :deep(.v-expansion-panel-title) {
  min-height: 48px;
  padding: 10px 16px 10px 14px;
  color: #e6edf3;
  font-weight: 600;
  font-size: 0.875rem;
}

.repo-panels :deep(.v-expansion-panel-title__overlay) {
  background: transparent;
}

.repo-panels :deep(.v-expansion-panel-title:hover) {
  background: #1c2128;
}

.repo-panels :deep(.v-expansion-panel-text__wrapper) {
  padding: 0 0 8px;
}

.panel-header {
  position: relative;
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
  margin-right: 8px;
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

.panel-body {
  background: #161b22;
}

.link-list {
  list-style: none;
  margin: 0;
  padding: 4px 8px 8px;
}

.link-list.nested {
  padding: 0 0 4px 18px;
}

.link-folder {
  margin: 2px 0;
}

.link-folder-toggle {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.link-folder-toggle:hover {
  background: rgba(177, 186, 196, 0.08);
}

.folder-count {
  margin-left: 8px;
  margin-right: 0;
}

.folder-chevron {
  margin-left: auto;
  color: #8b949e;
}

.link-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 10px;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.link-row:hover {
  background: rgba(177, 186, 196, 0.08);
}

.link-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.link-title {
  color: #e6edf3;
  font-size: 0.875rem;
  font-weight: 500;
}

.link-url {
  color: #8b949e;
  font-size: 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-preview {
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.35;
}

.link-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.link-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid #30363d;
  border-radius: 6px;
  background: #21262d;
  color: #c9d1d9;
  font: inherit;
  font-size: 0.75rem;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.15s ease, color 0.15s ease, background 0.15s ease;
}

.link-btn:hover {
  border-color: #58a6ff;
  color: #58a6ff;
  background: rgba(56, 139, 253, 0.1);
}

@media (max-width: 600px) {
  .link-row {
    flex-wrap: wrap;
  }

  .link-actions {
    width: 100%;
    padding-left: 24px;
  }
}

.empty-folder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
  padding: 1.25rem;
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
  min-height: 0;
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
  .repo-panels :deep(.v-expansion-panel) {
    animation: none;
    transition: none;
  }
}
</style>
