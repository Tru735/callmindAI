import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures assets are linked correctly in production
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
});