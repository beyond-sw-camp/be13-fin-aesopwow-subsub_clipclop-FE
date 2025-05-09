// /application/viewModels/UserDataViewModel.ts
import { useState } from "react";
import { fetchUserDataSearchResult } from "@/application/useCases/UserDataUsecase";

// MARK: - 유저 데이터 검색 결과 (테이블 형태로 반환)
export function useUserDataSearchResultViewModel() {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [error, setError] = useState<string | null>(null);

  const search = async (clusterType: string, fields: string[]) => {
    try {
      const result = await fetchUserDataSearchResult(clusterType, fields);
      setData(result); // result는 Record<string, string>[]
      setError(null);
    } catch {
      setError("유저 데이터를 불러오는 데 실패했습니다.");
    }
  };

  return {
    data,
    error,
    search,
  };
}