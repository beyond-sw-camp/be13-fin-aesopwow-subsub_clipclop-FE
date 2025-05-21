import axios from 'axios';
// import baseUri from '@/.env.production'
// import type {  }

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8001', // 백엔드 API 주소
  withCredentials: true, // CORS 쿠키 인증을 사용하는 경우
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
