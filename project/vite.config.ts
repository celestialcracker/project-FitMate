/**
 * Vite Configuration File
 * 
 * This file configures Vite, a modern frontend build tool that provides
 * a faster and leaner development experience. It handles bundling,
 * development server, and production builds.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
})
