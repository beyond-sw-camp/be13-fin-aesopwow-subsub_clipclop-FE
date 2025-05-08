// import { useState } from "react";
// import { UserRepository } from "../../infrastructure/repositories/UserRepository";
// import { useUserStore } from "../../core/user/UserStore";

// export function useLoginViewModel() {
//   const [loading, setLoading] = useState(false);
//   const setUser = useUserStore((state) => state.setUser);

//   const onClickSignInButton = async (_email: string, _password: string) => {
//     setLoading(true);
//     try {
//       const user = await UserRepository.login(_email, _password);
//       setUser(user); 
//       // await new Promise((resolve) => setTimeout(resolve, 2000)); // 예시: 2초 대기

//     } catch (error) {
//       console.error("로그인 실패", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     loading,
//     onClickSignInButton,
//   };
// }


import { useState } from "react";
import { LoginUseCase } from "../useCases/LoginUseCase";
import type { UserDto } from "@/core/model/User";

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginUseCase = new LoginUseCase();

  const onClickLoginButton = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const userDto = await loginUseCase.execute(email, password);
      setUser(userDto);
      alert("로그인 성공!");
    } catch (err) {
      console.error("로그인 실패:", err);
      setError("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    user,
    error,
    onClickLoginButton,
  };
};
