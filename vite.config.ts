// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 절대경로 @로 지정
    },
  },
  build: {
    rollupOptions: {
      // input: 'src/main.tsx', // main 진입점 위치
    },
  },
  base: './', // 여기에 base 설정을 추가합니다.
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8001", // 스프링 서버 주소
        changeOrigin: true,
        secure: false
      }
    }
  },
});
