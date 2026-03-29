import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Change 'frvb-website' to your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/FRVW-Website/',
})
