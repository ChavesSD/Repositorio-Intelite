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

    <p class="admin-desc mb-6">
      Altere os títulos e links dos itens das árvores de Tutoriais e APKs. As alterações são salvas localmente no navegador.
    </p>

    <v-row>
      <v-col cols="12" md="6">
        <v-card variant="outlined" rounded="lg" class="admin-card">
          <v-card-title class="card-header-github d-flex align-center">
            <v-icon start size="small">mdi-book-open-variant</v-icon>
            Tutoriais
          </v-card-title>
          <v-divider class="border-opacity-25" />
          <v-card-text class="admin-card-body">
            <div
              v-for="(cat, ci) in tutoriaisTree[0]?.children || []"
              :key="cat.value"
              class="admin-section"
            >
              <div class="admin-category-title">{{ cat.title }}</div>
              <div
                v-for="(item, ii) in cat.children"
                :key="item.value"
                class="admin-item-row"
              >
                <v-text-field
                  v-model="item.title"
                  label="Título"
                  density="compact"
                  variant="outlined"
                  hide-details
                  class="admin-field"
                />
                <v-text-field
                  v-model="item.link"
                  label="Link"
                  density="compact"
                  variant="outlined"
                  hide-details
                  class="admin-field"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card variant="outlined" rounded="lg" class="admin-card">
          <v-card-title class="card-header-github d-flex align-center">
            <v-icon start size="small">mdi-android</v-icon>
            APKs
          </v-card-title>
          <v-divider class="border-opacity-25" />
          <v-card-text class="admin-card-body">
            <div
              v-for="(cat, ci) in apksTree[0]?.children || []"
              :key="cat.value"
              class="admin-section"
            >
              <div class="admin-category-title">{{ cat.title }}</div>
              <div
                v-for="(item, ii) in cat.children"
                :key="item.value"
                class="admin-item-row"
              >
                <v-text-field
                  v-model="item.title"
                  label="Título"
                  density="compact"
                  variant="outlined"
                  hide-details
                  class="admin-field"
                />
                <v-text-field
                  v-model="item.link"
                  label="Link"
                  density="compact"
                  variant="outlined"
                  hide-details
                  class="admin-field"
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
import { useTreeStore } from '../composables/useTreeStore'

const { tutoriaisTree, apksTree, save, resetToDefault } = useTreeStore()
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

.admin-field :deep(.v-field) {
  background: #0d1117 !important;
  border-color: #30363d !important;
}

.admin-field :deep(.v-field__outline) {
  --v-field-border-opacity: 1;
}

.admin-field :deep(.v-input__control input),
.admin-field :deep(.v-field__input) {
  color: #c9d1d9 !important;
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
