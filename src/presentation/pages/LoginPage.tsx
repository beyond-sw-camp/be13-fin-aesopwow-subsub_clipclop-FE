import { TopNav } from "@/presentation/components/atoms/TopNav.tsx";
import { LoginCard } from "../components/organisms/LoginCard";
import { ProjectLogo } from "@/presentation/components/atoms/ProjectLogo.tsx";

const LoginPage = () => {
  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800 flex flex-col">
        <div className="absolute top-4 left-4">
            <ProjectLogo />
        </div>
        <div className="pt-6">
            <TopNav />
        </div>
        <div className="flex-grow flex items-center justify-center">
            <LoginCard />
        </div>
        <div className="pb-6 flex justify-center space-x-12 text-sm">
            <a style={{ color: 'purple' }} href="#">Forgot password?</a>
            <a style={{ color: 'purple' }} href="#">Create new account</a>
        </div>
    </div>
  );
};

export default LoginPage;