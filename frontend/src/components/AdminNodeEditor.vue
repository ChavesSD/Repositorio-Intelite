<template>
  <div class="admin-node" :style="{ marginLeft: depth * 16 + 'px' }">
    <div class="admin-node-header">
      <div class="admin-node-fields">
        <v-text-field
          v-model="node.title"
          label="Nome"
          density="compact"
          variant="outlined"
          hide-details
          class="admin-field"
        />
        <v-text-field
          v-model="node.link"
          label="Link (opcional)"
          density="compact"
          variant="outlined"
          hide-details
          class="admin-field"
        />
      </div>
      <div class="admin-node-actions">
        <v-btn
          icon
          size="small"
          variant="text"
          @click="addFolder"
        >
          <v-icon>mdi-folder-plus</v-icon>
        </v-btn>
        <v-btn
          icon
          size="small"
          variant="text"
          color="error"
          @click="deleteSelf"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </div>

    <div
      v-for="(child, index) in node.children || []"
      :key="child.value || index"
      class="admin-node-children"
    >
      <AdminNodeEditor
        :node="child"
        :depth="depth + 1"
        @delete-node="() => removeChild(index)"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  node: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const emit = defineEmits(['delete-node'])

function ensureChildren () {
  if (!Array.isArray(props.node.children)) {
    props.node.children = []
  }
}

function addFolder () {
  ensureChildren()
  props.node.children.push({
    value: `folder-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: 'Nova pasta',
    children: [],
  })
}

function removeChild (index) {
  if (!Array.isArray(props.node.children)) return
  props.node.children.splice(index, 1)
}

function deleteSelf () {
  emit('delete-node')
}
</script>

<style scoped>
.admin-node {
  margin-bottom: 20px;
}

.admin-node-header {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.admin-node-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-node-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.admin-node-children {
  margin-top: 12px;
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
</style>

