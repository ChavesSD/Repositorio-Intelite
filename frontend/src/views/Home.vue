<template>
  <v-container fluid class="pa-4">
    <h1 class="page-title mb-2">Bem-vindo</h1>
    <p class="page-description mb-6">
      Repositório central de tutoriais em vídeo e APKs dos produtos Intelite Tecnologia.
    </p>

    <v-row>
      <v-col
        v-for="col in columns"
        :key="col.value"
        cols="12"
        :md="colMd"
      >
        <v-card variant="outlined" rounded="lg" class="tree-card tree-card-github">
          <v-card-title class="card-header-github d-flex align-center">
            <v-icon start size="small">mdi-folder</v-icon>
            {{ col.title }}
          </v-card-title>
          <v-divider class="border-opacity-25" />
          <v-card-text class="pa-0 card-body-github">
            <v-treeview
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
                <v-icon v-if="item.link" size="small" class="mr-2 tree-icon">
                  {{ item.type === 'apk' ? 'mdi-download' : 'mdi-file' }}
                </v-icon>
                <v-icon v-else size="small" class="mr-2 tree-icon">mdi-folder</v-icon>
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTreeStore } from '../composables/useTreeStore'

const { columns, loadFromBackend } = useTreeStore()

const colMd = computed(() => {
  const n = Math.min(columns.value.length || 1, 4)
  return 12 / n
})

onMounted(() => {
  loadFromBackend()
})
</script>

<style scoped>
.page-title {
  color: #c9d1d9;
  font-size: 1.25rem;
  font-weight: 400;
  text-align: center;
}

.page-description {
  color: #8b949e;
  font-size: 0.9375rem;
  line-height: 1.5;
  text-align: center;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}

.tree-card {
  min-height: 400px;
}

.tree-card-github {
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

.card-body-github {
  background: #161b22 !important;
}

.tree-view {
  min-height: 360px;
}

.tree-view-github :deep(.v-treeview-item) {
  color: #c9d1d9;
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

:deep(.v-treeview-item) {
  min-height: 40px;
}

:deep(.v-treeview-item--active) {
  background: rgba(56, 139, 253, 0.1);
  color: #58a6ff;
}

:deep(.v-treeview-group__items) {
  padding-left: 16px;
}

:deep(.v-divider) {
  border-color: #30363d !important;
}
</style>

