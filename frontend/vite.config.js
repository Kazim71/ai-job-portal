import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: process.env.NODE_ENV === 'development' ? {
      key: fs.existsSync('./certs/localhost-key.pem') ? fs.readFileSync('./certs/localhost-key.pem') : undefined,
      cert: fs.existsSync('./certs/localhost.pem') ? fs.readFileSync('./certs/localhost.pem') : undefined,
    } : false,
    host: true,
    port: 5173,
  },
  define: {
    global: 'globalThis',
  },
})
