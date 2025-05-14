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
                <div className="absolute top-4 left-4 z-40 flex items-center">
                    <ProjectLogo />
                    <span
                        className="text-3xl font-extrabold text-white rounded-lg"
                        style={{
                            fontFamily: "Pretendard, 'Noto Sans KR', 'Apple SD Gothic Neo', 'sans-serif'",
                            letterSpacing: "-0.03em",
                            lineHeight: 1.1,
                            marginLeft: 0,
                        }}
                    >
                        다구독 <br />다구독
                    </span>

                </div>

                {/* 중앙 TopNav */}
                <div className="flex justify-center pt-6">
                    <TopNav />
                </div>
            </div>
        </>
    );
}