import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: mode === 'production' ? 4001 : 3001,
    proxy: {
      '/api': {
        target: mode === 'production' ? 'http://localhost:4002' : 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'production' ? false : true,
  },
}));
