import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_OMDB_API_KEY': JSON.stringify('4c120848'),
    'import.meta.env.VITE_YOUTUBE_API_KEY': JSON.stringify('AIzaSyCJMkskxwdak2Gzpk6oQw6k6lBKFQDi4-4'),
  }
})