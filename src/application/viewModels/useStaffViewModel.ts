import axios from "axios";
import { useEffect, useState } from "react";
import { StaffItem } from "@/core/model/StaffItem";
import { useAuthStore } from "@/application/stores/AuthStore";
import { toast } from "react-toastify";

export function useStaffViewModel() {
  const [staffList, setStaffList] = useState<StaffItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const token = useAuthStore.getState().token;

  const fetchStaffList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/user/staffs/list", {
        params: {
          adminUserNo: localStorage.getItem("adminUserNo"),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStaffList(res.data.data);
    } catch (err) {
      console.error("직원 목록 불러오기 실패:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffList();
  }, [token]);

  const handleAdd = async (email: string) => {
    try {
      const res = await axios.post(
        "/api/user/staffs/add",
        null,
        {
          params: {
            adminUserNo: localStorage.getItem("adminUserNo"),
            userEmail: email,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "직원 추가 성공");

      setStaffList((prev) => {

        const safePrev = Array.isArray(prev) ? prev : [];

        return [...safePrev, res.data.data];
      });

    } catch (err) {
      console.error("직원 추가 실패:", err);
      toast.error("직원 추가 실패");
    }
  };

  const handleEdit = async (id: number, newTitle: string, newSubtitle: string) => {
    // 직원 수정 API 따로 있다면 여기에 연결
    toast.info("직원 수정 기능은 아직 구현되지 않았습니다.");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`/api/user/staffs/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("직원이 삭제되었습니다.");
      setStaffList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("직원 삭제 실패:", err);
      toast.error("직원 삭제 중 오류 발생");
    }
  };

  return {
    staffList,
    setStaffList,
    isLoading,
    handleAdd,
    handleEdit,
    handleDelete,
    fetchStaffList,
  };
}
