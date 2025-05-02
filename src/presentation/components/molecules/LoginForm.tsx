import { InputLogin } from "../atoms/InputLogin"; 
import { LoginButton } from "../atoms/LoginButton";
import { LoginCheckbox } from "../atoms/LoginCheckBox";

export const LoginForm = () => {
    return (
        <form className="flex flex-col space-y-4 w-full">
            <InputLogin 
                label="email" 
                placeholder="Email" 
            />
            <InputLogin 
                label="password" 
                placeholder="Password"
            />
            <LoginCheckbox />
            <div className="pt-4">
                <LoginButton />
            </div>
        </form>
    );
};
