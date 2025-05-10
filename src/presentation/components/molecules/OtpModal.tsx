import { Modals } from "../atoms/Modals";
import { InputOneTimePassword } from "./InputOtp";
import { useEffect, useState } from "react";
import { CustomButton } from "../atoms/CustomButton";

type OtpModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  onVerify: (otp: string) => void; // OTP 확인 함수
};

export const OtpModal = ({ open, setOpen, email, onVerify }: OtpModalProps) => {
  const [timer, setTimer] = useState(180);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));

  useEffect(() => {
    console.log("OtpModal 열림 상태:", open);
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

  const handleResend = () => {
    console.log("OTP 재전송");
    setTimer(180); // 타이머 리셋
  };

  const handleConfirm = () => {
    const code = otp.join("");
    if (code.length === 6) {
      onVerify(code);
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
        />
        <CustomButton title="확인" loading={false} onClick={handleConfirm} />
      </div>
    </Modals>
  );
};
