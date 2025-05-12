import { ProjectLogo } from "@/presentation/components/atoms/ProjectLogo"
import { SideMenu } from "@/presentation/layout/SideMenu";
import { Header } from "@/presentation/layout/Header";
import { ProfileButton } from "@/presentation/components/atoms/ProfileButton";
import { ProfileCard } from "@/presentation/components/organisms/ProfileCard";
import { UserDetailPanel } from "@/presentation/components/organisms/UserDetailPanel";
import profileImg from '@/assets/profileimg.png';

// function Header() {
//   return (
//     <header className="w-full h-16 flex items-center justify-between px-8 bg-primary shadow z-10">
//       <div className="flex items-center gap-4">
//         <Header />
//       </div>
//       <Header />
//     </header>
//   );
// }


export default function MyPage() {
  return (
    <div className="min-h-screen w-screen bg-primary flex flex-col">
      {/* 상단 헤더 */}
      <Header />
      {/* 아래 한 줄: 사이드바 + 메인 */}
      <div className="flex flex-1"></div>
      
      <div className="min-h-screen w-screen bg-primary text-gray-800 flex">
        {/* 좌측 사이드바 */}
        <div className="pt-4 pl-4">
            <SideMenu />
        </div>

        {/* 우측 메인 영역 */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* 메인 흰색 컨테이너 */}
          <div className="flex justify-start items-start flex-1">
            <div
              className="
                bg-white
                rounded-2xl
                shadow-2xl
                w-full
                max-w-5xl
                flex flex-col
                px-16
                py-12
                gap-8
                ml-8
                mt-4
              "
              style={{ boxSizing: "border-box" }}
            >
              {/* 버튼 영역 */}
              <div className="flex justify-between items-center mb-8">
                <ProfileButton type="plan" label="Ultimate" />
                <ProfileButton type="days" label="23 남은 일수" />
              </div>
              {/* 프로필 카드 */}
              <ProfileCard
                src={profileImg} 
                alt="프로필 이미지"
                name="유재우"
                company="한화 비욘드 시스템 13기"
              />
              {/* 정보/관리/알림 패널 */}
              <UserDetailPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
