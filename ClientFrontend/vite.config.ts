import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig(({ mode }) => ({
  server: {
  host: '::',
  port: 8080,
  // fail if 8080 is taken so we don't silently pick another port
  strictPort: true,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))
