import { SignUpUserInfoForm } from "../molecules/SignupUserInfoForm";
import { SignUpPasswordForm } from "../molecules/SignupPasswordForm";
import { useState } from "react";
import { OtpModal } from "../molecules/OtpModal";
import { SignupApi, VerifyOtpApi } from "@/infrastructure/api/auth";

interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
}

interface Props {
  form: SignupForm;
  setForm: React.Dispatch<React.SetStateAction<SignupForm>>;
}

export const SignupCard = ({ form, setForm }: Props) => {
  const [otpOpen, setOtpOpen] = useState(false);
  const [email, setEmail] = useState(form.email);

  const handleOtpSent = () => {
    console.log("OTP 발송 후 모달 열림");
    setEmail(form.email); 
    setOtpOpen(true);
  };

  const handleOtpVerify = async (otp: string) => {
    try {
      const verifyResponse = await VerifyOtpApi(email, otp);
      console.log("OTP 검증 성공:", verifyResponse);

      const signupResponse = await SignupApi(email, form.password);
      console.log("회원가입 성공:", signupResponse);

      setOtpOpen(false);

    } catch (error) {
      console.error("OTP 확인 또는 회원가입 실패:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg p-7 h-[550px] w-80 text-center text-black shadow-md space-y-4">
      <SignUpUserInfoForm form={form} setForm={setForm} />
      <SignUpPasswordForm form={form} setForm={setForm} onOtpSent={handleOtpSent} />

      <OtpModal
        open={otpOpen}
        setOpen={setOtpOpen}
        email={email}
        onVerify={handleOtpVerify} 
      />
    </div>
  );
};


