import React, { useState, useEffect } from "react";

export interface ForgotPasswordOtpModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  onVerify: (otp: string) => Promise<void>;
}

export const ForgotPasswordOtpModal = ({
  open,
  setOpen,
  email,
  onVerify,
}: ForgotPasswordOtpModalProps) => {
  const [timer, setTimer] = useState(180);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleInput = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[idx] = value;
    setOtp(next);
    // 자동 포커스 이동
    if (value && idx < 5) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("6자리 코드를 정확히 입력해주세요.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await onVerify(code);
      setOtp(Array(6).fill(""));
      setOpen(false);
    } catch (e) {
      setError("OTP 인증에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // const handleClose = () => {
  //   setOtp(Array(6).fill(""));
  //   setError("");
  //   setOpen(false);
  // };

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-0 w-[540px] h-[340px] flex flex-col justify-center items-center text-black shadow-md">
        <div className="w-full flex flex-col items-center px-12">
          <h2 className="text-lg font-bold mt-6 mb-2 text-center">이메일 인증</h2>
          <p className="text-sm text-gray-600 mb-1 text-center">
            <span className="font-semibold">{email}</span>으로 전송된 6자리 코드를 입력하세요.
          </p>
          <div className="mb-1 text-gray-500 text-xs text-center">
            {formatTime(timer)} 내로 입력해주세요.
          </div>
          <div className="flex gap-2 my-4">
            {otp.map((v, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                maxLength={1}
                value={v}
                onChange={e => handleInput(e.target.value, idx)}
                className="w-14 h-14 text-center border-2 border-gray-300 rounded-lg text-2xl focus:border-yellow-500 transition"
                autoFocus={idx === 0}
              />
            ))}
          </div>
          <div className="mb-2 text-gray-400 text-xs text-center">
            메일을 받지 못하셨나요?
          </div>
          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
          <button
            className="w-full py-2 bg-[#FFA726] hover:bg-[#fb8c00] text-white font-bold text-base rounded mb-4 transition"
            onClick={handleVerify}
            disabled={loading || otp.join("").length !== 6}
          >
            {loading ? "확인 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};
