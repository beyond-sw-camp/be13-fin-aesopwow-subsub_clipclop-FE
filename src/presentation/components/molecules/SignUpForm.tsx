import { InputTextBox } from "../atoms/InputTextBox";
import { CheckBox } from "../atoms/CheckBox";
import { Text } from "../atoms/TextLabel";
import { useMemo } from 'react';

export interface Props {
  form: { 
    name: string;
    email: string;
    password: string;
    rePassword: string;
    agree: boolean 
  };
  
  setForm: (form: Props['form']) => void;
}


export const SignupForm = ({ form, setForm }: Props) => {
  const passwordStrength = useMemo(() => {
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(form.password);
    return form.password.length >= 8 && hasSpecialChar ? 'strong' : 'weak';
  }, [form.password]);

  const passwordMatch = useMemo(() => {
    return form.password === form.rePassword;
  }, [form.password, form.rePassword]);

  return ( 
    <form className="flex flex-col space-y-4 w-full">
      <InputTextBox
        type="name"
        label="Name"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <InputTextBox
        type="default"
        label="Email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <InputTextBox
        type="password"
        label="Password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <InputTextBox
        type="password"
        label="Re-enter Password"
        placeholder="Confirm Password"
        value={form.rePassword}
        onChange={(e) => setForm({ ...form, rePassword: e.target.value })}
      />
      <Text size="xs" className="italic text-gray-500">
        password strength:
      </Text>
      <Text size="xs" className={passwordStrength === 'strong' ? 'text-green-500' : 'text-red-500'}>
        {passwordStrength}
      </Text>

      {!passwordMatch && (
        <Text size="xs" className="text-red-500">
          Passwords do not match.
        </Text>
      )}

      <div className="flex items-center gap-2 text-sm"> 
        <CheckBox
          checked={form.agree}
          onChange={(e) => setForm({ ...form, agree: e.target.checked })}
        />
        <label>
          I agree with the{' '}
          <a href="/privacy" className="text-blue-600 underline">Privacy Policy</a>
        </label>
      </div>
    </form>
  );
};
