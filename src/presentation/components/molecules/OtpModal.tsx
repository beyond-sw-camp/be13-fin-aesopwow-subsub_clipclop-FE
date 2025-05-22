import { Modals } from "../atoms/Modals";
import { InputOneTimePassword } from "./InputOtp";
import { useEffect, useState } from "react";
import { CustomButton } from "../atoms/CustomButton";
import { VerifyOtpApi } from "@/infrastructure/api/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type OtpModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  password: string;
  confirmPassword: string;
  onVerify?: (otp: string) => Promise<void>;
};

export const OtpModal = ({ open, setOpen, email, password, confirmPassword }: OtpModalProps) => {
  const [timer, setTimer] = useState(180);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

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

  // const handleResend = () => {
  //   console.log("OTP 재전송");
  //   setTimer(180);
  //   // 나중에 백엔드 재전송 API 연결
  // };

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
    
    // 2. 회원가입 요청 보내기 (axios 사용)
    const signupResponse = await axios.post('http://localhost:8001/api/auth/signup', {
      email,
      password, 
      confirmPassword,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // JWT 토큰 추가
      }
    });

    console.log('회원가입 성공:', signupResponse.data);
    alert('회원가입에 성공하셨습니다. 로그인 페이지로 이동합니다.')
    setOpen(false); // 모달 닫기
    navigate('/signin');
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
          // onResendClick={handleResend}
          setOtp={setOtp} // 부모 상태 전달
        />
        <CustomButton title="확인" loading={loading} onClick={handleConfirm} />
      </div>
    </Modals>
  );
};
