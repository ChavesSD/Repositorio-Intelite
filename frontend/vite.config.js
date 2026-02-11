import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  publicDir: '../public',
  server: {
    port: 3000, // altere aqui a porta local (npm run dev)
  },
})

