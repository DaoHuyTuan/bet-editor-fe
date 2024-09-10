import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src/workers',
      filename: 'upload-worker.js',
      registerType: 'autoUpdate',
      injectManifest: {
        injectionPoint: undefined
      }
    })
  ]
})
