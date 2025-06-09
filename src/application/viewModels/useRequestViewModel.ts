import { useState, useEffect } from "react";
import { fetchRequestById } from "@/infrastructure/api/RequestApi";

export interface RequestItem {
  id: number;
  name: string;
  departmentName: string;
}

export function useRequestViewModel() {
  const [requestList, setRequestList] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 테스트용: ID 1번 요청 내역만 불러오는 예시
        const res = await fetchRequestById(1);
        setRequestList([{
          id: res.data.requireListNo,
          name: `요청 ${res.data.requireListNo}`,
          departmentName: `DB ${res.data.infoDbNo}`
        }]);
      } catch (error) {
        console.error("요청 내역 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return {
    requestList,
    isLoading,
  };
}