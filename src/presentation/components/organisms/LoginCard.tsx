import { LoginForm } from "../molecules/LoginForm";
import { Text } from "../atoms/TextLabel";
import { LinkText } from "../atoms/LinkText";

export const LoginCard = () => {
    return (
        <div className="bg-white rounded-lg p-7 h-[380px] w-80 text-center text-black shadow-md">
            <Text size="sm" weight="normal" className="mb-3 text-gray-600">
                Sign in with <br />
                Or sign up with credentials
            </Text>
            <LoginForm />
            <div className="pb-6 flex justify-center space-x-2 mt-6">
                <LinkText to="/forgot/password">Forgot password?</LinkText>
                <LinkText to="/signup">Create new account</LinkText>
            </div>
        </div>
    );
};