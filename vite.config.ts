import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: ".env",
  build: {
    minify: false
  },
  plugins: [
    react()
  ],
  server: {
    port: 8080
  }
})