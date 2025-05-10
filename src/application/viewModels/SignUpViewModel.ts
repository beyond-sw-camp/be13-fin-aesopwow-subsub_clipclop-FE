import { useState } from "react";
import { EmailCheckUseCase, CreateAccountUseCase, ModalSignupUseCase } from "../useCases/SignupUseCase"; // 경로 맞춰주세요
import type { CheckEmailResponse } from "@/core/model/CheckEmail";
import type { OtpVerificationRequest } from "@/core/model/OtpVerificationRequest";

export const useSignupViewModel = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [emailChecked, setEmailChecked] = useState<boolean | null>(null);
  const [signupComplete, setSignupComplete] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const emailCheckUseCase = new EmailCheckUseCase();
  const createAccountUseCase = new CreateAccountUseCase();
  const modalSignupUseCase = new ModalSignupUseCase();

  const CheckEmailResponse = async () => {
    try {
      const res: CheckEmailResponse = await emailCheckUseCase.execute(email); // 이메일만 전달
      setEmailChecked(res.available); // 사용 가능 여부 상태 업데이트
    } catch (error) {
      console.error("이메일 중복 확인 실패", error);
      setEmailChecked(false); // 오류 발생 시 사용 불가로 설정
    }
  };
  

  const sendOtp = async () => {
    try {
      await createAccountUseCase.execute(email, password);
      setShowOtpModal(true);
    } catch (error) {
      console.error("OTP 전송 실패", error);
    }
  };

  const verifyOtp = async () => {
    try {
      const res: OtpVerificationRequest = await modalSignupUseCase.verifyotp(email, otp);
      if (res.success) {
        setSignupComplete(true);
        setShowOtpModal(false);
      }
    } catch (error) {
      console.error("OTP 인증 실패", error);
    }
  };

  return {
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    otp,
    setOtp,
    emailChecked,
    signupComplete,
    showOtpModal,
    setShowOtpModal,
    CheckEmailResponse,
    sendOtp,
    verifyOtp,
  };
};