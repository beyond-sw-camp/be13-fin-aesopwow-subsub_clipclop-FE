import { InputTextBox } from "../atoms/InputTextBox";
import { CustomButton } from "../atoms/CustomButton";
import { useState } from "react";

interface Props {
  form: {
    email: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onOtpRequest: () => void;
  loading?: boolean;
  message?: string;
}

export const ForgetPasswordForm = ({
  form,
  setForm,
  onOtpRequest,
  loading = false,
  message = ""
}: Props) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(naver\.com|kakao\.com|gmail\.com)$/;

  const isValidEmail = (email: string): boolean => emailRegex.test(email);

  const handleOtpRequest = () => {
    if (!isValidEmail(form.email)) {
      alert("유효하지 않은 이메일입니다.");
      return;
    }
    onOtpRequest();
  };

  return (
    <div className="space-y-3">
      <InputTextBox
        type="email"
        label="Email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm((prev: any) => ({ ...prev, email: e.target.value }))}
      />
      <div className="pt-2">
        <CustomButton
          title="OTP 요청"
          loading={loading}
          type="button"
          onClick={handleOtpRequest}
        />
        {message && (
          <p className="text-sm text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
