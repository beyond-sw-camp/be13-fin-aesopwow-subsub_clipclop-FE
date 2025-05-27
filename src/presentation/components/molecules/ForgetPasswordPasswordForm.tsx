import { InputTextBox } from "../atoms/InputTextBox";
import { CustomButton } from "../atoms/CustomButton";
import { Text } from "../atoms/TextLabel";
import React, { useMemo } from "react";

interface Props {
  form: {
    email: string;
    password: string;
    confirmPassword: string;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  onSubmit: () => void;
  loading?: boolean;
}

export const ForgetPasswordPasswordForm = ({
  form,
  setForm,
  onSubmit,
  loading = false,
}: Props) => {
  // 비밀번호 강도 계산
  const passwordStrength = useMemo(() => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);
    return form.password.length >= 8 && hasSpecialChar ? "strong" : "weak";
  }, [form.password]);

  // 비밀번호 일치 여부
  const passwordMatch = useMemo(
    () => form.password === form.confirmPassword,
    [form.password, form.confirmPassword]
  );

  return (
    <div className="space-y-3">
      <InputTextBox
        type="password"
        label="새 비밀번호"
        placeholder="새 비밀번호"
        value={form.password}
        onChange={e => setForm((prev: any) => ({ ...prev, password: e.target.value }))}
      />
      <InputTextBox
        type="password"
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        value={form.confirmPassword}
        onChange={e => setForm((prev: any) => ({ ...prev, confirmPassword: e.target.value }))}
      />
      <div className="flex items-center space-x-1 justify-center">
        <Text size="xs" className="italic text-gray-500">password strength :</Text>
        <Text
          size="xs"
          className={passwordStrength === "strong" ? "text-green-500" : "text-red-500"}
        >
          {passwordStrength}
        </Text>
      </div>
      {!passwordMatch && (
        <Text size="xs" className="text-red-500">
          비밀번호가 일치하지 않습니다.
        </Text>
      )}
      <div className="pt-2">
        <CustomButton
          title="비밀번호 변경"
          loading={loading}
          type="button"
          onClick={onSubmit}
        />
      </div>
    </div>
  );
};
