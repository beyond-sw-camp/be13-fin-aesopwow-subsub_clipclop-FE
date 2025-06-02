import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";
import { LogoutApi } from "@/infrastructure/api/auth";

export const LogoutUseCase = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const logoutAndRedirect = async () => {
    try {
      await LogoutApi();
    } catch (error) {
      console.error("백엔드에서 로그아웃 실패", error);
    }
    localStorage.clear();
    sessionStorage.clear();

    logout();
    
    navigate("/login");
  };
  
  return {
    logout: logoutAndRedirect,
  };
};
