import { ref, computed } from 'vue'
import { tutoriaisTree as defaultTutoriais, apksTree as defaultApks } from '../data/treeData'

const STORAGE_KEY = 'intelitehub-trees'

function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function loadFromStorage () {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.tutoriais && parsed.apks) return parsed
    }
  } catch (_) {}
  return null
}

const stored = loadFromStorage()
const tutoriaisTree = ref(stored ? stored.tutoriais : deepClone(defaultTutoriais))
const apksTree = ref(stored ? stored.apks : deepClone(defaultApks))

export function useTreeStore () {
  function save () {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        tutoriais: tutoriaisTree.value,
        apks: apksTree.value,
      }))
      return true
    } catch (_) {
      return false
    }
  }

  function resetToDefault () {
    tutoriaisTree.value = deepClone(defaultTutoriais)
    apksTree.value = deepClone(defaultApks)
    save()
  }

  return {
    tutoriaisTree,
    apksTree,
    save,
    resetToDefault,
  }
}
