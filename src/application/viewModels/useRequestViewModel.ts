import { useState, useEffect } from "react";
import { fetchRequestById } from "@/infrastructure/api/RequestApi";

export interface RequestItem {
  id: number;
  name: string;
  departmentName: string;
}

export function useRequestViewModel(requestId?: number) {
  const [requestList, setRequestList] = useState<RequestItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!requestId) return;
        const res = await fetchRequestById(requestId);
        setRequestList([{
          id: res.data.requireListNo,
          name: res.data.title || `요청 ${res.data.requireListNo}`,
          departmentName: res.data.department || `DB ${res.data.infoDbNo}`
        }]);
      } catch (error) {
        // console.error("요청 내역 불러오기 실패", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [requestId]);

  return {
    requestList,
    isLoading,
  };
}