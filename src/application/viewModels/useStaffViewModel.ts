// /viewmodels/useStaffViewModel.ts

import { useEffect, useState } from "react";
import { StaffItem } from "@/core/model/StaffItem";
import axiosInstance from "@/infrastructure/api/Axios";

export function useStaffViewModel() {
    const [staffList, setStaffList] = useState<StaffItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const token = sessionStorage.getItem("token"); // 저장된 JWT

    useEffect(() => {
        if (!token) {
            console.error("토큰이 없습니다. 로그인 후 다시 시도해주세요.");
            setIsLoading(false);
            return;
        }
        handleGetStaffList();
    }, [token]);

    const handleGetStaffList = async () => {
        setIsLoading(true);
        try {
            const res = await axiosInstance.get("/user/staffs/list", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStaffList(res.data.data);
        } catch (error) {
            alert("직원 목록을 불러오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async (email: string) => {
        try {
            const res = await axiosInstance.post("/user/staffs/add", {
              email,
              title: "새 직원",
              subtitle: "신규 팀",
            });
            setStaffList((prev) => [...prev, res.data]);
        } catch (err) {
            console.error("직원 추가 실패:", err);
            alert("직원 추가 중 오류가 발생했습니다.");
        }
    };

    const handleEdit = async (id: number, newTitle: string, newSubtitle: string) => {
        try {
            await axiosInstance.put(`/user/staffs/${id}/update`, {
                title: newTitle,
                subtitle: newSubtitle,
            });
            setStaffList((prev) =>
                prev.map((item) =>
                    item.userNo === id ? { ...item, title: newTitle, subtitle: newSubtitle } : item
                )
            );
        } catch (error) {
            console.error("직원 정보 수정 실패:", error);
            alert("직원 정보를 수정하는 데 실패했습니다.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await axiosInstance.delete(`/staffs/${id}`);
            setStaffList((prev) => prev.filter((item) => item.userNo !== id));
        } catch (err) {
            console.error("직원 삭제 실패:", err);
            alert("직원 삭제 중 오류가 발생했습니다.");
        }
    };

    return {
        staffList,
        setStaffList,
        isLoading,
        handleAdd,
        handleEdit,
        handleDelete,
    };
}