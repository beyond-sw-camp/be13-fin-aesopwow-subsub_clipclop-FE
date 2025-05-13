// hooks/useAuth.ts
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore"; // 경로는 프로젝트 구조에 맞게 조정

export const LogoutUseCase = () => {
  const navigate = useNavigate();
  const { token, setToken, logout } = useAuthStore();

  const logoutAndRedirect = () => {
    logout();
    navigate("/signin");
  };

  return {
    token,
    setToken,
    logout: logoutAndRedirect,
  };
};
