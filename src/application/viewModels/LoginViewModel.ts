import { useState } from "react";
import { LoginUseCase } from "../useCases/LoginUseCase";
import type { LoginResponse } from "@/core/model/LoginResponse"; 
import { useNavigate } from "react-router-dom";


export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<LoginResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const loginUseCase = new LoginUseCase();

  const onClickLoginButton = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userDto = await loginUseCase.execute(email, password);
      setToken(userDto);
      alert("로그인 성공!");
      navigate("/mypage")
    } catch (err) {
      alert("로그인 실패");
      setError("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    token,
    error,
    onClickLoginButton,
  };
};
