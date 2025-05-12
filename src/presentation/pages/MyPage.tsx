import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { Header } from "@/presentation/layout/Header";
import { ProfileButton } from "@/presentation/components/atoms/ProfileButton";
import { ProfileCard } from "@/presentation/components/organisms/ProfileCard";
import { UserDetailPanel } from "@/presentation/components/organisms/UserDetailPanel";
import profileImg from "@/assets/profileimg.png";
import { fetchMyPageUserInfo } from "@/infrastructure/api/MypageApi";

interface UserInfo {
  name: string;
  company: string;
  plan: string;
  remainingDays: number;
}

const getPlanName = (membership: string): string => {
  switch (membership.toLowerCase()) {
    case "basic":
      return "Basic";
    case "prime":
      return "Prime";
    case "ultimate":
      return "Ultimate";
    default:
      return "Unknown";
  }
};


const calculateRemainingDays = (expiredDate: string): number => {
  const today = dayjs();
  const expiry = dayjs(expiredDate);
  const diff = expiry.diff(today, "day");
  return diff >= 0 ? diff : 0;
};

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await fetchMyPageUserInfo();

        setUserInfo({
          name: data.username || "정보 없음",
          company: data.companyName || "정보 없음",
          plan: getPlanName(data.membership || "") || "정보 없음",
          remainingDays: calculateRemainingDays(data.membership_expired_at || ""),
        });
      } catch (error) {
        console.error("사용자 정보를 불러오는데 실패했습니다.", error);

        // fallback 값 설정
        setUserInfo({
          name: "정보 없음",
          company: "정보 없음",
          plan: "정보 없음",
          remainingDays: 0,
        });
      }
    };

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div className="text-white p-8">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen w-screen bg-primary flex flex-col">
      <Header />
      <div className="flex flex-1"></div>
  
      <div className="min-h-screen w-screen bg-primary text-gray-800 flex">
        <div className="pt-4 pl-4">
          <SideMenu />
        </div>
  
        <div className="flex-1 flex flex-col min-h-screen">
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
              {/* 버튼 2개 + 프로필카드 묶기 */}
                <div className="flex flex-col gap-6 mb-8">
                  {/* 버튼들을 좌우 끝으로 배치 */}
                  <div className="flex justify-between w-full">
                    <ProfileButton type="plan" label={userInfo.plan} />
                    <ProfileButton type="days" label={`${userInfo.remainingDays} 남은 일수`} />
                  </div>

                  <ProfileCard
                    src={profileImg}
                    alt="프로필 이미지"
                    name={userInfo.name}
                    company={userInfo.company}
                    imgClassName="w-56 h-56" // 이미지 크기 2배
                  />
                </div>
              <UserDetailPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}