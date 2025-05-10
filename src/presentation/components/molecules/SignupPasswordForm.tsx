import { InputTextBox } from "../atoms/InputTextBox";
import { CheckBox } from "../atoms/CheckBox";
import { Text } from "../atoms/TextLabel";
import { useMemo } from "react";
import { CustomButton } from "../atoms/CustomButton";
import { SignupOtpApi } from "@/infrastructure/api/auth";

interface Props {
  form: {
    email: string;
    password: string;
    confirmPassword: string;
    agree: boolean;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onOtpSent: () => void;
}

export const SignUpPasswordForm = ({ form, setForm, onOtpSent }: Props) => {
  const passwordStrength = useMemo(() => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);
    return form.password.length >= 8 && hasSpecialChar ? "strong" : "weak";
  }, [form.password]);

  const passwordMatch = useMemo(() => form.password === form.confirmPassword, [
    form.password,
    form.confirmPassword,
  ]);

  const handleSubmit = async () => {
    console.log("전송할 데이터:", {
      email: form.email,
      password: form.password
    });
    try {
      await SignupOtpApi(form.email, form.password); 
      onOtpSent();
    } catch (err: any) {
      // onOtpSent(); // 이미 otp보냇다고 떠서 모달 볼라고 넣음
      console.error("OTP 전송 실패:", err);
      alert(err?.response?.data || "OTP 전송 중 오류가 발생했습니다.");
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
          <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>
        </label>
      </div>
      <div className="pt-2 justify-center items-center">
        <CustomButton
          title="Create Account"
          type="button"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};
