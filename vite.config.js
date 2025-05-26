import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['gensync'], // exclure gensync du pre-bundling
  },
  build: {
    commonjsOptions: {
      exclude: ['gensync'], // exclure gensync lors du build
    },
  },
  server: {
    host: '0.0.0.0', // Permet l'accès depuis l'extérieur du container
    port: 5173,
    watch: {
      usePolling: true, // Nécessaire pour le hot reload dans Docker
    },
  },
})
