import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import string from 'vite-plugin-string';

export default defineConfig({
  plugins: [
    react(),
    string({
      include: '**/*.ttf',  // ttf 파일을 base64 문자열로 불러오기 위해 추가
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.ttf'], // 폰트를 정적 자산으로 인식
});