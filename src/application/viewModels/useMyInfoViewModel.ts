import { useEffect, useState, useCallback } from "react";
// import { StaffItem } from "@/core/model/StaffItem";
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
  const [myInfo, setMyInfo] = useState<MyInfoItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthStore((state) => state.token);

  const fetchMyInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.get("/user/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMyInfo(res.data.data);
    } catch (error) {
      // console.error("내 정보 조회 실패:", error);
      alert("사용자 정보를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const handleEdit = async (updateData: Partial<MyInfoItem>) => {
    try {
      await axiosInstance.put("/user/my/update", {
        userNo: updateData.userNo,
        userName: updateData.name,          
        departmentName: updateData.departmentName,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchMyInfo();
    } catch (error) {
      alert("내 정보를 수정하는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    if (token) fetchMyInfo();
    else setIsLoading(false);
  }, [token, fetchMyInfo]);

  return {
    myInfo,
    myInfoList: myInfo ? [myInfo] : [],
    isLoading,
    handleEdit,
    refetch: fetchMyInfo,
  };
  
}
