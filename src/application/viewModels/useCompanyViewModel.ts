import axios from "axios";
import { useEffect, useState } from "react";
import { CompanyInfo } from "@/core/model/CompanyInfo";
import { useAuthStore } from "@/application/stores/AuthStore";

export function useCompanyViewModel() {
  const [companyList, setCompanyList] = useState<CompanyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const token = useAuthStore((state) => state.token);
  const companyNo = useAuthStore((state) => state.companyNo);

  useEffect(() => {
    if (!companyNo) return;

    axios
      .get(`/api/company/${companyNo}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setCompanyList(res.data))
      .catch((err) => console.error("회사 정보 로딩 실패:", err))
      .finally(() => setIsLoading(false));
  }, [token, companyNo]);

  const handleEdit = async (id: number, newTitle: string, newSubtitle: string) => {
    try {
      await axios.put(
        `/api/company/${id}`,
        { name: newTitle, departmentName: newSubtitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCompanyList((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, name: newTitle, departmentName: newSubtitle } : item
        )
      );
    } catch (error) {
      // console.error("회사 정보 수정 실패:", error);
      alert("회사 정보를 수정하는 데 실패했습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`/api/company/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanyList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      // console.error("회사 정보 삭제 실패:", error);
      alert("회사 정보를 삭제하는 데 실패했습니다.");
    }
  };

  return {
    companyList,
    isLoading,
    handleEdit,
    handleDelete,
  };
}