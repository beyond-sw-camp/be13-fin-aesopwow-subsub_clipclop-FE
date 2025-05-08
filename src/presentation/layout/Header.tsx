// /presentation/layout/Header.tsx
import { TopNav } from "@/presentation/components/atoms/TopNav";
import { ProjectLogo } from "@/presentation/components/atoms/ProjectLogo";
import { ProfileAvatar } from "@/presentation/components/atoms/ProfileAvatar";
import { useLocation } from "react-router-dom";

export function Header() {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";

    return (
        <>
            {!isLoginPage && <ProfileAvatar />}

            <div className="w-full relative">
                {/* 좌측 상단 ProjectLogo */}
                <div className="absolute top-4 left-4 z-40">
                    <ProjectLogo />
                </div>

                {/* 중앙 TopNav */}
                <div className="flex justify-center pt-6">
                    <TopNav />
                </div>
            </div>
        </>
    );
}