import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.dagudok-service.com/api', // 베포용 백엔드 API 주소
  // baseURL: 'http://localhost:8001/api', // 백엔드 API 주소
  withCredentials: true, // CORS 쿠키 인증을 사용하는 경우
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;