import { useState } from "react";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/application/stores/AuthStore"; 

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginUseCase = new LoginUseCase();
  const setToken = useAuthStore((state) => state.setToken); // zustand 상태 업데이트 함수 사용

  
  const onClickLoginButton = async (
    email: string, 
    password: string,
    remember: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await loginUseCase.execute(email, password); // token만 받는 구조

      if (!token) {
      throw new Error("서버에서 토큰이 오지 않았습니다.");
    }
    
      setToken(token, remember); // zustand에 저장
      alert("로그인 성공!");
      navigate("/dashboard"); 
    } catch (err) {
      alert("로그인 실패");
      setError("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    onClickLoginButton,
  };
};
