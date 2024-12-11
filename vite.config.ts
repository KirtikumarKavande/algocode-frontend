import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Ignore TypeScript errors during the build process
    logOverride: { 'ts(1234)': 'silent' },
  },
})
