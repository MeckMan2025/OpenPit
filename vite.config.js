import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Relative base so the same build works on GitHub Pages under /OpenPit/ or at a root domain.
export default defineConfig({ plugins: [react()], base: './' })
