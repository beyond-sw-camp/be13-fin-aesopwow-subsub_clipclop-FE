import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { Header } from "@/presentation/layout/Header";
import { ProfileButton } from "@/presentation/components/atoms/ProfileButton";
import { ProfileCard } from "@/presentation/components/organisms/ProfileCard";
import { UserDetailPanel } from "@/presentation/components/organisms/UserDetailPanel";
import profileImg from "@/assets/profileimg.png";
import { fetchMyPageUserInfo } from "@/infrastructure/api/MypageApi";

export default function MyPage() {
  // 1. UserInfo 타입 정의
  interface UserInfo {
    name: string;
    company: string;
    plan: string;
    remainingDays: number;
  }

  // 3. 만료 날짜를 기준으로 남은 일수를 계산하는 함수
  const calculateRemainingDays = (expiredDate: string): number => {
    const today = dayjs();
    const expiry = dayjs(expiredDate);
    const diff = expiry.diff(today, "day")+1;
    console.log(diff);
    console.log(today);
    console.log(expiry);
    return diff >= 0 ? diff : 0;
  };

  // 4. 상태 관리
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // 5. 마이페이지 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userNo = userData.userNo;

        console.log(userData);
  
        if (!userNo) throw new Error("로그인된 사용자 정보가 없습니다.");
  
        const data = await fetchMyPageUserInfo(userNo);
  
        setUserInfo({
          name: data.username || "정보 없음",
          company: data.companyName || "정보 없음",
          plan: data.membershipName || "정보 없음",
          remainingDays: calculateRemainingDays(data.membershipExpiredAt || " "),
        });
      } catch (e) {
        setError(true);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUserInfo();
  }, []);
  
  

  // 6. 로딩 중, 에러 처리
  if (loading) return <div className="text-white p-8">로딩 중...</div>;
  if (error) return <div className="text-red-500 p-8">데이터를 불러오지 못했습니다.</div>;

  // 7. 렌더링
  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800 flex flex-col">
      {/* 헤더 */}
      <div className="mt-4">
        <Header />
      </div>

      {/* 본문: 사이드 + 메인 */}
      <div className="flex flex-1">
        {/* 사이드 메뉴 */}
        <div className="pt-4 pl-4 mt-4">
          <SideMenu />
        </div>

        {/* 메인 컨텐츠 */}
        <div className="flex-1 flex justify-start items-start">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl mx-auto flex flex-col px-12 py-12 gap-8 mt-8"
            style={{ boxSizing: "border-box" }}
          >
            {/* 버튼 2개 + 프로필카드 묶기 */}
            {userInfo && (
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex justify-between w-full">
                  <ProfileButton type="plan" label={userInfo.plan} />
                  <ProfileButton type="days" label={`${userInfo.remainingDays} 남은 일수`} />
                </div>
                <ProfileCard
                  src={profileImg}
                  alt="프로필 이미지"
                  name={userInfo.name}
                  company={userInfo.company}
                  imgClassName="w-56 h-56"
                />
              </div>
            )}
            <UserDetailPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
