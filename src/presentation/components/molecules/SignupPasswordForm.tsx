import { InputTextBox } from "../atoms/InputTextBox";
import { CheckBox } from "../atoms/CheckBox";
import { Text } from "../atoms/TextLabel";
import { useMemo } from "react";
import { CustomButton } from "../atoms/CustomButton";
import { SignupOtpApi } from "@/infrastructure/api/auth";
import { CheckEmailResponse } from "@/core/model/CheckEmail";

interface Props {
  form: {
    email: string;
    password: string;
    confirmPassword: string;
    agree: boolean;
    name: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onOtpSent: (password: string) => void;
  emailCheckResult: CheckEmailResponse | null;
}

export const SignUpPasswordForm = ({ form, setForm, onOtpSent, emailCheckResult }: Props) => {
  const passwordStrength = useMemo(() => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);
    return form.password.length >= 8 && hasSpecialChar ? "strong" : "weak";
  }, [form.password]);

  const passwordMatch = useMemo(() => form.password === form.confirmPassword, [
    form.password,
    form.confirmPassword,
  ]);

  const handleSubmit = async () => {
  if (!form.agree) {
    alert("개인정보 처리방침에 동의하셔야 가입이 가능합니다.");
    return;
  }

  if (!emailCheckResult || !emailCheckResult.available || emailCheckResult.email !== form.email) {
    alert("이메일 중복 확인을 해주세요.");
    return;
  }

  if (!passwordMatch) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    await SignupOtpApi(form.email, form.password, form.name); 
    onOtpSent(form.password); 

  } catch (err: any) {
    console.error("회원가입 중 오류:", err);
    alert(err?.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
  }
};

  return (
    <div className="space-y-3">
      <InputTextBox
        type="password"
        label="Password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm((prev: any) => ({ ...prev, password: e.target.value }))}
      />
      <InputTextBox
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={(e) => setForm((prev: any) => ({ ...prev, confirmPassword: e.target.value }))}
      />
      <div className="flex items-center space-x-1 justify-center">
        <Text size="xs" className="italic text-gray-500">password strength :</Text>
        <Text size="xs" className={passwordStrength === "strong" ? "text-green-500" : "text-red-500"}>
          {passwordStrength}
        </Text>
      </div>
      {!passwordMatch && (
        <Text size="xs" className="text-red-500">
          Passwords do not match.
        </Text>
      )}
      <div className="flex items-center gap-2 text-sm">
        <CheckBox
          checked={form.agree}
          onChange={(e) => setForm((prev: any) => ({ ...prev, agree: e.target.checked }))}
        />
        <label>
          I agree with the{" "}
          <a href="src\assets\PrivacyPolicy.pdf" download="PrivacyPolicy.pdf" className="text-blue-600 underline">Privacy Policy</a>
        </label>
      </div>
      <div className="pt-2 justify-center items-center">
        <CustomButton
          title="Create Account"
          type="button"
          onClick={handleSubmit} loading={false}        />
      </div>
    </div>
  );
};
