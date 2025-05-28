// /viewmodels/useStaffViewModel.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { StaffItem } from "@/core/model/StaffItem";

export function useStaffViewModel() {
    const [staffList, setStaffList] = useState<StaffItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/staffs")
            .then((res) => setStaffList(res.data))
            .catch((err) => console.error("직원 정보 로딩 실패:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleAdd = async () => {
        try {
            const res = await axios.post("/api/staffs", {
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
            await axios.put(`/api/staffs/${id}`, {
                title: newTitle,
                subtitle: newSubtitle,
            });
            setStaffList((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, title: newTitle, subtitle: newSubtitle } : item
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
            await axios.delete(`/api/staffs/${id}`);
            setStaffList((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error("직원 삭제 실패:", err);
            alert("직원 삭제 중 오류가 발생했습니다.");
        }
    };

    return {
        staffList,
        isLoading,
        handleAdd,
        handleEdit,
        handleDelete,
    };
}
