import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  publicDir: '../public',
  server: {
    port: 3000,
    proxy: {
      // Proxy para listar pastas públicas do Google Drive (sem CORS)
      '/api/drive-folder': {
        target: 'https://drive.google.com',
        changeOrigin: true,
        rewrite: (path) => {
          const id = path.replace(/^\/api\/drive-folder\//, '')
          return `/embeddedfolderview?id=${decodeURIComponent(id)}`
        },
      },
      // Proxy para baixar texto de arquivos públicos
      '/api/drive-file': {
        target: 'https://drive.google.com',
        changeOrigin: true,
        rewrite: (path) => {
          const id = path.replace(/^\/api\/drive-file\//, '')
          return `/uc?export=download&id=${decodeURIComponent(id)}`
        },
      },
    },
  },
})
