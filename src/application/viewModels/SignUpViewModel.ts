// import { useState, useMemo } from "react";
// import type { Props } from "../../presentation/components/molecules/SignUpForm";
// import { UserRepository } from "@/infrastructure/repositories/UserRepository";

// export const useSignupViewModel = () => {
//   const [loading, setLoading] = useState(false);

//   const onClickSignUpButton = async (_name: string, _email: string, _password: string) => {
//     setLoading(true);
//     try {
//       console.log("회원가입 요청:", { _name, _email, _password });

//       // 실제 회원가입 API 호출
//       await UserRepository.signup(_email, _password, _name);

//       alert("회원가입 성공!");
//     } catch (error) {
//       console.error("회원가입 실패:", error);
//       alert("회원가입 실패!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signupForm = ({ form, setForm }: Props) => {
//     const passwordStrength = useMemo(() => {
//       const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);
//       const isLongEnough = form.password.length >= 8;
//       return isLongEnough && hasSpecialChar ? "strong" : "weak";
//     }, [form.password]);

//     return {
//       passwordStrength,
//       form,
//       setForm,
//     };
//   };

//   return {
//     loading,
//     onClickSignUpButton,
//     signupForm,
//   };
// };

import { useState, useMemo } from "react";
import type { Props } from "../../presentation/components/molecules/SignUpForm";
import { SignupUseCase } from "@/application/useCases/SignupUseCase";

export const useSignupViewModel = () => {
  const [loading, setLoading] = useState(false);
  const signupUseCase = new SignupUseCase(); 

  const onClickSignUpButton = async (_name: string, _email: string, _password: string) => {
    setLoading(true);
    try {
      console.log("회원가입 요청:", { _name, _email, _password });

      await signupUseCase.execute(_name, _email, _password);

      alert("회원가입 성공!");
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert("회원가입 실패!");
    } finally {
      setLoading(false);
    }
  };

  const signupForm = ({ form, setForm }: Props) => {
    const passwordStrength = useMemo(() => {
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);
      const isLongEnough = form.password.length >= 8;
      return isLongEnough && hasSpecialChar ? "strong" : "weak";
    }, [form.password]);

    return {
      passwordStrength,
      form,
      setForm,
    };
  };

  return {
    loading,
    onClickSignUpButton,
    signupForm,
  };
};

