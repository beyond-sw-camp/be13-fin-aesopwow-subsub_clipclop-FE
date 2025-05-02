import { LoginForm } from "../molecules/LoginForm"

export const LoginCard = () => {
    return (
        <div className="bg-white rounded-lg p-7 h-[400px] w-80 text-center text-black shadow-md">
            <h2 className="text-sm text-gray-600 mb-3">Sign in with</h2>
            <p className="text-sm text-gray-600 mb-6">Or sign up with credentials</p>
            <LoginForm />
        </div>
    );
};