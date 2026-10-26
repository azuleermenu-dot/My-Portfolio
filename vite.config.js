import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves the site from /My-Portfolio/.
  // Vercel serves the site from the domain root.
  base: process.env.GITHUB_ACTIONS ? '/My-Portfolio/' : '/',
  plugins: [react()],
});
