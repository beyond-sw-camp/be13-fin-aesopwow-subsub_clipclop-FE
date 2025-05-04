import React, { useState } from "react";
import { InputTextBox } from "../atoms/InputTextBox";
import { CustomButton } from "../atoms/CustomButton";
import { LoginCheckbox } from "../atoms/LoginCheckBox";
import { useLoginViewModel } from "../../../application/viewModels/LoginViewModel";

export const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, onClickSignInButton } = useLoginViewModel();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClickSignInButton(email, password);
    };

    return (
        <form className="flex flex-col space-y-4 w-full" onSubmit={handleSubmit}>
            <InputTextBox
                type="default"
                label="Email"
                placeholder="Email"
                value={email}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setEmail(e.target.value)}
            />
            <InputTextBox
                type="password"
                label="Password"
                placeholder="Password"
                value={password}
                onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setPassword(e.target.value)}
            />

            <LoginCheckbox />
            <div className="pt-4">
                <CustomButton
                    title="로그인 하기"
                    loading={loading}
                    type="submit" // submit 타입으로 지정
                />
            </div>
        </form>
    );
};
