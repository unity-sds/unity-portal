import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: ".env",
  build: {
    minify: true
  },
  plugins: [
    react()
  ],
  server: {
    port: 8080
  }
})