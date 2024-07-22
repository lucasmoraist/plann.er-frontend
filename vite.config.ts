import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/plann.er-frontend/',
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
})
