import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from "vite-plugin-svgr";

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
      // exportAsDefault: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {},
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://dagudok-service.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // define: {
  //   ''
  // }
});