import { Modals } from "../atoms/Modals";
import { InputOneTimePassword } from "./InputOtp";
import { useEffect, useState } from "react";
import { CustomButton } from "../atoms/CustomButton";
import { VerifyOtpApi, SignupApi } from "@/infrastructure/api/auth";
import { useNavigate } from "react-router-dom";
import { ResendOtpApi, EmailCheckApi } from "@/infrastructure/api/auth";
import { Text } from "@/presentation/components/atoms/TextLabel";

type OtpModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  password: string;
  confirmPassword: string;
  name: string; // ✅ 추가
  phone: string;
  onVerify?: (otp: string) => Promise<void>;
};

export const OtpModal = ({ open, setOpen, email, password, confirmPassword, name, phone }: OtpModalProps) => {
  const [timer, setTimer] = useState(180);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setTimer(180);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open]);

  const formatTime = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleResend = async () => {
    setLoading(true);
    setResendMessage(null);

    try {
      await EmailCheckApi({ email });
      setTimer(180);
      await ResendOtpApi(email);
      setResendMessage("✅ OTP가 전송되었습니다.");
    } catch (error: any) {
      console.error("OTP 재전송 실패", error);
      const message =
        error?.response?.data || "❌ OTP 재전송 중 알 수 없는 오류가 발생했습니다.";
      setResendMessage(message);
    } finally {
    setLoading(false);
    }
  };


  const handleConfirm = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      alert("6자리 코드를 정확히 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      // 1. OTP 검증
      await VerifyOtpApi(email, code);

      // 2. 회원가입 요청
      await SignupApi(email, password, confirmPassword, name, phone);

      alert("회원가입에 성공하셨습니다. 로그인 페이지로 이동합니다.");
      setOpen(false); // 모달 닫기
      navigate("/login");
    } catch (error) {
      console.error("OTP 확인 또는 회원가입 실패", error);
      alert("OTP 인증 또는 회원가입에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modals open={open} setOpen={setOpen}>
      <div className="flex flex-col items-center gap-4">
        <InputOneTimePassword
          email={email}
          timer={timer}
          formatTime={formatTime}
          onResendClick={handleResend}
          setOtp={setOtp}
        />
        {resendMessage && (
        <Text className="text-sm text-red-500 mt-2">{resendMessage}</Text>
      )}
        <CustomButton title="확인" loading={loading} onClick={handleConfirm} />
      </div>
    </Modals>
  );
};
