import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // 기본 경로 설정
  headers: {
    "Content-Type": "application/json"
  }
});

export default axiosInstance;
