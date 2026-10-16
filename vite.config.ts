import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  // Listen on all interfaces so the page is reachable as both
  // localhost and 127.0.0.1 (two different sites for storage partitioning)
  server: { host: true },
})
