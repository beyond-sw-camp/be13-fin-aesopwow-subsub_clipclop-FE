// /viewmodels/useCompanyViewModel.ts
import { useEffect, useState } from "react";
import axios from "axios";
import { CompanyInfo } from "@/core/model/CompanyInfo";

export function useCompanyViewModel() {
    const [companyList, setCompanyList] = useState<CompanyInfo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/company")
            .then((res) => setCompanyList(res.data))
            .catch((err) => console.error("회사 정보 로딩 실패:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const handleEdit = async (id: number, newTitle: string, newSubtitle: string) => {
        try {
            await axios.put(`/api/company/${id}`, {
                title: newTitle,
                subtitle: newSubtitle,
            });
            setCompanyList((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, title: newTitle, subtitle: newSubtitle } : item
                )
            );
        } catch (error) {
            console.error("회사 정보 수정 실패:", error);
            alert("회사 정보를 수정하는 데 실패했습니다.");
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            setCompanyList((prev) => prev.filter((item) => item.id !== id));
        }
    };

    return {
        companyList,
        isLoading,
        handleEdit,
        handleDelete,
    };
}
