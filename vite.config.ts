import { defineConfig } from 'vite'
import vitePluginString from 'vite-plugin-string'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  vitePluginString()],
})
