import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import { LogoutApi } from "@/infrastructure/api/auth";

export const LogoutUseCase = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

 const logoutAndRedirect = async () => {
  console.log("[LOG] LogoutUseCase 시작됨");

  try {
    await LogoutApi();
  } catch (error) {
  }

  // 순서 바꿈: 먼저 zustand 상태 정리
  logout();

  // 그 다음 storage 삭제
  localStorage.clear();
  sessionStorage.clear();

  navigate("/login");
};

  
  return {
    logout: logoutAndRedirect,
  };
};
