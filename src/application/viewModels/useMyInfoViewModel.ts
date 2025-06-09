import { useEffect, useState } from "react";
import { StaffItem } from "@/core/model/StaffItem";
import axiosInstance from "@/infrastructure/api/Axios";
import { useAuthStore } from "@/application/stores/AuthStore";

export interface MyInfoItem {
  userNo: number;
  name: string;
  departmentName: string;
  email: string;
  companyName: string;
  roleName: string;
}

export function useMyInfoViewModel() {
  const [myInfo, setMyInfo] = useState<StaffItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore.getState().token;

  const fetchMyInfo = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/user/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyInfo(res.data.data);
    } catch (error) {
      console.error("내 정보 조회 실패:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async (updateData: Partial<StaffItem>) => {
    try {
      await axiosInstance.put("/user/my/update", updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchMyInfo();
    } catch (error) {
      console.error("내 정보 수정 실패:", error);
      alert("내 정보를 수정하는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (token) fetchMyInfo();
    else setIsLoading(false);
  }, [token]);

  return {
    myInfo,
    myInfoList: myInfo ? [myInfo] : [],
    isLoading,
    handleEdit,
    refetch: fetchMyInfo,
  };
  
}
