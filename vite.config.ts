import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: ".env",
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: "stream-browserify",
      util: 'util/'
    }
  },
  server: {
    port: 8080
  }
})