<template>
  <li class="link-row">
    <v-icon size="small" class="tree-icon mr-2">
      {{ isMessage ? 'mdi-message-outline' : 'mdi-link-variant' }}
    </v-icon>
    <div class="link-info">
      <span class="link-title">{{ item.title }}</span>
      <span class="link-url" :class="{ 'message-preview': isMessage }">
        {{ isMessage ? preview : item.link }}
      </span>
    </div>
    <div class="link-actions">
      <a
        v-if="!isMessage"
        :href="item.link"
        target="_blank"
        rel="noopener noreferrer"
        class="link-btn"
        :aria-label="`Abrir ${item.title} em nova aba`"
      >
        <v-icon size="16">mdi-open-in-new</v-icon>
        Abrir
      </a>
      <button
        type="button"
        class="link-btn"
        :aria-label="`${isMessage ? 'Copiar mensagem' : 'Copiar URL de'} ${item.title}`"
        @click="$emit('copy', item)"
      >
        <v-icon size="16">mdi-content-copy</v-icon>
        Copiar
      </button>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
})
defineEmits(['copy'])

const isMessage = computed(() => props.item.type === 'message')

// Prévia sem repetir o título (a 1ª linha das mensagens costuma ser ele)
const preview = computed(() => {
  const text = String(props.item.text || '').trim()
  const [first, ...rest] = text.split('\n')
  const body = first.trim() === props.item.title.trim() ? rest.join(' ') : text
  return body.replace(/\s+/g, ' ').trim()
})
</script>

<style scoped>
.link-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 6px;
  transition: background 0.15s ease;
}

.link-row:hover {
  background: rgba(177, 186, 196, 0.08);
}

.tree-icon {
  color: #8b949e !important;
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
  line-clamp: 2;
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
  padding: 4px 10px;
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

.link-btn:focus-visible {
  outline: 2px solid #58a6ff;
  outline-offset: 2px;
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
</style>
