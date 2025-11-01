import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const keyPath = './certs/localhost-key.pem'
const certPath = './certs/localhost.pem'

// Check if SSL certificates exist
const hasSSL = fs.existsSync(keyPath) && fs.existsSync(certPath)

if (!hasSSL && process.env.NODE_ENV === 'development') {
  console.log('\n⚠️  SSL certificates not found!')
  console.log('Run: npm run generate-certs (or scripts/generate-certs.sh)')
  console.log('Falling back to HTTP for now...\n')
}

export default defineConfig({
  plugins: [react()],
  server: {
    https: hasSSL ? {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    } : false,
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    open: hasSSL ? 'https://localhost:5173' : 'http://localhost:5173'
  },
  define: {
    global: 'globalThis',
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          clerk: ['@clerk/clerk-react']
        }
      }
    }
  }
})
