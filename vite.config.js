import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  server: {
    middlewareMode: false,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173
    }
  }
})