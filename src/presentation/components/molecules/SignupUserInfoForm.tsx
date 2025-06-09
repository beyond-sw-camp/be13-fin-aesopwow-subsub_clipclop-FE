import { InputTextBox } from "../atoms/InputTextBox";
import { CustomButton } from "../atoms/CustomButton";
import { useState, useEffect } from "react";
import { EmailCheckApi } from "@/infrastructure/api/auth";
import type { CheckEmailResponse } from "@/core/model/CheckEmail";

interface Props {
  form: {
    name: string;
    email: string;
    phone: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  setEmailCheckResult: React.Dispatch<React.SetStateAction<CheckEmailResponse | null>>;
  emailCheckResult: CheckEmailResponse | null;
}

export const SignUpUserInfoForm = ({ form, setForm, setEmailCheckResult, emailCheckResult }: Props) => {
  const [loading, setLoading] = useState(false);
  const [phoneValid, setPhoneValid] = useState(true);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@(naver\.com|kakao\.com|gmail\.com)$/;
  const phoneRegex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/;

  const isValidEmail = (email: string): boolean => {
    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setForm((prev: any) => ({ ...prev, phone: newPhone }));
    setPhoneValid(isValidPhone(newPhone));
  };

  const handleSubmit = async () => {
    if (!isValidEmail(form.email)) {
      alert("유효하지 않은 이메일입니다.");
      return;
    }

    if (!isValidPhone(form.phone)) {
      alert("유효하지 않은 전화번호입니다.");
      return;
    }

    setLoading(true);
    setEmailCheckResult(null);

    try {
      const result = await EmailCheckApi({ email: form.email });
      console.log("API 응답:", result);

      setEmailCheckResult({ ...result, email: form.email });
    } catch (error: any) {
      console.error("API 호출 오류:", error);
      setEmailCheckResult({ email: form.email, available: false });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      setEmailCheckResult(null);
    }, [form.email]);

  
  return (
    <div className="space-y-3">
      <InputTextBox
        type="text"
        label="Name"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm((prev: any) => ({ ...prev, name: e.target.value }))}
      />
      <InputTextBox
        type="text"
        label="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handlePhoneChange}
      />

      {!phoneValid && (
        <p className="text-red-500 text-xs">올바른 전화번호 형식을 입력해주세요.</p>
      )}

      <InputTextBox
        type="email"
        label="Email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm((prev: any) => ({ ...prev, email: e.target.value }))}
      />
      <div className="pt-2">
        <CustomButton
          title="Check Email"
          loading={loading}
          type="button"
          onClick={handleSubmit}
          color={undefined}
        />
        {emailCheckResult && (
          <p className="text-sm text-gray-700">
            {emailCheckResult.available ? "사용 가능한 이메일입니다." : "사용 불가한 이메일입니다."}
          </p>
        )}
      </div>
    </div>
  );
};


