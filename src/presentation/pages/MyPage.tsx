import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader";

import { useMyInfoViewModel } from "@/application/viewModels/useMyInfoViewModel";
import { useStaffViewModel } from "@/application/viewModels/useStaffViewModel";
import { UserViewModel } from "@/application/viewModels/UserViewModel";

import { fetchMyPageUserInfo } from "@/infrastructure/api/MypageApi";

import { Header } from "@/presentation/layout/Header";
import { SideMenu } from "@/presentation/layout/SideMenu";

import { ProfileButton } from "@/presentation/components/atoms/ProfileButton";
import { EmailInputModal } from "@/presentation/components/molecules/EmailInputModal";
import { ProfileCard } from "@/presentation/components/organisms/ProfileCard";
import { UserDetailPanel } from "@/presentation/components/organisms/UserDetailPanel";
import { EditableListModal } from "@/presentation/components/organisms/EditableListModal";
import { MyInfoModal } from "@/presentation/components/organisms/MyInfoModal";

import { MyPageRequest } from "@/presentation/pages/MyPageRequest";

import profileImg from "@/assets/profileimg.png";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [showMyInfoModal, setShowMyInfoModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const userViewModel = new UserViewModel();

  const {
    myInfoList,
    handleEdit,
  } = useMyInfoViewModel();

  const {
    staffList,
    handleAdd: handleStaffAdd,
    handleEdit: handleStaffEdit,
    handleDelete: handleStaffDelete,
  } = useStaffViewModel();

  const handleMyInfoEdit = (id: number, name: string, departmentName: string) => {
    handleEdit({
      userNo: id,
      name,
      departmentName,
    });
  };

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
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleSubmitEmail = useCallback(
    async (email: string) => {
      try {
        await handleStaffAdd(email);
        setShowEmailModal(false);
      } catch (err) {
        toast.error("직원 추가에 실패했습니다.");
      }
    },
    [handleStaffAdd]
  );

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
          remainingDays: calculateRemainingDays(data.membershipExpiredAt || ""),
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

  if (loading) return <DotWaveLoader color="black" />;
  if (error || !userInfo) return <div className="text-red-500 p-8">데이터를 불러오지 못했습니다.</div>;

  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800 flex flex-col">
      <div className="mt-4">
        <Header />
      </div>

      <div className="flex flex-1">
        <div className="pt-4 pl-4 mt-4">
          <SideMenu />
        </div>

        <div className="flex-1 flex justify-start items-start p-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-auto flex flex-col px-12 py-16 gap-8">
            <div className="flex flex-col gap-6 mb-8">
              <div className="flex justify-around w-full">
                <ProfileButton type="plan" label={userInfo.plan} />
                <ProfileButton type="days" label={`${userInfo.remainingDays} 남은 일수`} />
              </div>
              <ProfileCard
                src={profileImg}
                alt="프로필 이미지"
                name={userInfo.name}
                company={userInfo.company}
                imgClassName="w-28 h-28"
              />
            </div>

            <UserDetailPanel
              onMyInfoClick={() => setShowMyInfoModal(true)}
              onStaffClick={() => setShowStaffModal(true)}
              onRequestClick={() => setShowRequestModal(true)}
              onAlarmClick={() => {}}
            />

            {showMyInfoModal && (
              <MyInfoModal
                title="내 정보"
                data={myInfoList.map((item) => ({
                  userNo: item.userNo,
                  name: item.name,
                  departmentName: item.departmentName || "",
                  email: item.email || "-",
                  companyName: item.companyName || "-",
                  roleName: item.roleName || "-",
                }))}
                onEdit={handleMyInfoEdit}
                onDelete={handleDeleteAccount}
                onClose={() => setShowMyInfoModal(false)}
              />
            )}

            {showStaffModal && (
              <EditableListModal
                title="직원 관리"
                data={staffList.map((item) => ({
                  id: item.userNo,
                  name: item.name,
                  departmentName: item.departmentName || "",
                }))}
                onEdit={handleStaffEdit}
                onDelete={handleStaffDelete}
                onAdd={() => setShowEmailModal(true)}
                addLabel="추가"
                onClose={() => setShowStaffModal(false)}
              />
            )}

            {showRequestModal && (
              <MyPageRequest
                isOpen={showRequestModal}
                onClose={() => setShowRequestModal(false)}
              />
            )}

            {showEmailModal && (
              <EmailInputModal
                onClose={() => setShowEmailModal(false)}
                onSubmit={handleSubmitEmail}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
