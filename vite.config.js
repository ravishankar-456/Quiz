import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Quiz/',        // 👈 ADD THIS LINE
  plugins: [react()],
})
