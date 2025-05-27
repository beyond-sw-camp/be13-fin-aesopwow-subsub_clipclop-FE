import React, { useState } from "react";

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
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      await onVerify(otp);
      setOtp("");
    } catch (e) {
      setError("OTP 인증에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOtp("");
    setError("");
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-2 text-center">이메일 인증</h2>
        <p className="text-sm text-gray-600 mb-4 text-center">
          <span className="font-semibold">{email}</span>로 전송된 OTP를 입력하세요.
        </p>
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          placeholder="OTP 입력"
          className="w-full px-3 py-2 bg-gray-700 text-white text-lg font-medium mb-4 border-none outline-none"
          style={{ borderRadius: 0 }}
        />
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            className="w-1/2 py-2 bg-gray-700 text-white font-bold text-base"
            style={{ borderRadius: 0 }}
            onClick={handleClose}
            disabled={loading}
          >
            취소
          </button>
          <button
            className="w-1/2 py-2 bg-black text-white font-bold text-base"
            style={{ borderRadius: 0 }}
            onClick={handleVerify}
            disabled={loading || !otp}
          >
            {loading ? "확인 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};
