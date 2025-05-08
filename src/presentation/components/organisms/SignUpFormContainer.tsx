import { SignupForm } from '../molecules/SignUpForm';
import { CustomButton } from "../atoms/CustomButton";
import { Text } from '../atoms/TextLabel';
import { useState } from 'react';
import { useSignupViewModel } from '../../../application/viewModels/SignUpViewModel';

export const SignupFormContainer = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    rePassword: '',
    agree: false });

  const { loading, onClickSignUpButton } = useSignupViewModel();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onClickSignUpButton(form.name, form.email, form.password);
    console.log('회원가입 정보:', form);
  };

  return (
    <div className="bg-white rounded-lg p-7 h-[500px] w-80 text-center text-black shadow-md">
      <Text size="sm" weight="normal" className="mb-3 text-gray-600">
        Sign in with <br />
        Or sign up with credentials
      </Text>

      <form onSubmit={handleSubmit}>
        <SignupForm form={form} setForm={setForm} />
        <div className="pt-4">
          <CustomButton 
            title="CREATE ACCOUNT"
            loading={loading}
            type="submit" 
          />
        </div>
      </form>
    </div>
  );
};
