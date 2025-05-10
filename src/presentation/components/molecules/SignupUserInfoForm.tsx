import { InputTextBox } from "../atoms/InputTextBox";
import { CustomButton } from "../atoms/CustomButton";
import { useState } from "react";
import { EmailCheckApi } from "@/infrastructure/api/auth";
import type { CheckEmailResponse } from "@/core/model/CheckEmail";

interface Props {
  form: {
    name: string;
    email: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
}

export const SignUpUserInfoForm = ({ form, setForm }: Props) => {
  const [loading, setLoading] = useState(false);
  const [emailCheckResult, setEmailCheckResult] = useState<CheckEmailResponse | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setEmailCheckResult(null);
  
    try {
      const result = await EmailCheckApi({ email: form.email });
      console.log("API 응답:", result);
  
      // API 응답의 available 값에 따라 상태 설정
      setEmailCheckResult({ ...result, email: form.email });
    } catch (error: any) {
      console.error("API 호출 오류:", error);
      setEmailCheckResult({ email: form.email, available: false });
    } finally {
      setLoading(false);
    }
  };
  
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


