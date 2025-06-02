import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/AuthStore";

export const LogoutUseCase = () => {
  const navigate = useNavigate();
  const { token, setToken, logout } = useAuthStore();

  const logoutAndRedirect = () => {
    logout();
    navigate("/login");
  };
  
  return {
    token,
    setToken,
    logout: logoutAndRedirect,
  };
};
