import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { Header } from "@/presentation/layout/Header";
import { ProfileButton } from "@/presentation/components/atoms/ProfileButton";
import { ProfileCard } from "@/presentation/components/organisms/ProfileCard";
import { UserDetailPanel } from "@/presentation/components/organisms/UserDetailPanel";
import profileImg from "@/assets/profileimg.png";
import { fetchMyPageUserInfo } from "@/infrastructure/api/MypageApi";
import { UserViewModel } from "@/application/viewModels/UserViewModel";
import { MyPageCompany } from "@/presentation/pages/MyPageCompany";
import { MyPageStaff } from "@/presentation/pages/MyPageStaff";
import { MyPageRequest } from "@/presentation/pages/MyPageRequest";

interface UserInfo {
  name: string;
  company: string;
  plan: string;
  remainingDays: number;
}

const calculateRemainingDays = (expiredDate: string): number => {
  const today = dayjs();
  const expiry = dayjs(expiredDate);
  const diff = expiry.diff(today, "day") + 1;
  return diff >= 0 ? diff : 0;
};

export default function MyPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);

  const userViewModel = new UserViewModel();

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (!confirmed) return;

    try {
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      const userNo = userData.userNo;

      if (!userNo) throw new Error("로그인된 사용자 정보가 없습니다.");

      await userViewModel.deleteUser(userNo);
      alert("회원 탈퇴가 완료되었습니다.");
      window.location.href = "/login";
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || "{}");
        const userNo = userData.userNo;

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

  if (loading) return <div className="text-white p-8">로딩 중...</div>;
  if (error) return <div className="text-red-500 p-8">데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800 flex flex-col">
      {/* 헤더 */}
      <div className="mt-4">
        <Header />
      </div>

      {/* 본문: 사이드 + 메인 */}
      <div className="flex flex-1">
        <div className="pt-4 pl-4 mt-4">
          <SideMenu />
        </div>

        <div className="flex-1 flex justify-start items-start p-8">
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-auto flex flex-col px-12 py-16 gap-8"
            style={{ boxSizing: "border-box" }}
          >
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

            <UserDetailPanel
              onCompanyClick={() => setShowCompanyModal(true)}
              onStaffClick={() => setShowStaffModal(true)}
              onRequestClick={() => setShowRequestModal(true)}
              onAlarmClick={() => setShowCompanyModal(true)}
            />

            {showCompanyModal && (
              <MyPageCompany isOpen={showCompanyModal} onClose={() => setShowCompanyModal(false)} />
            )}

            {showStaffModal && (
              <MyPageStaff isOpen={showStaffModal} onClose={() => setShowStaffModal(false)} />
            )}

            {showRequestModal && (
              <MyPageRequest isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} />
            )}

            {/* ✅ 가장 아래에 회원 탈퇴 버튼 추가 */}
            <button
              onClick={handleDeleteAccount}
              className="mt-4 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg self-end"
            >
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}