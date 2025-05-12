// /application/viewModels/SegmentViewModel.ts

import { useState } from "react";
import { fetchSegmentSearchResult } from "@/application/useCases/SegmentUsecase";

// MARK: - 세그먼트 검색 결과
export function useSegmentSearchResultViewModel() {
  const [data, setData] = useState<{
    field: string;
    problem: string;
    actions: string[];
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const search = async (keyword: string, tag: string) => {
    try {
      const result = await fetchSegmentSearchResult(keyword, tag);
      setData(result);
      setError(null);
    } catch {
      setError("검색 결과를 불러오는 데 실패했습니다.");
    }
  };

  return { data, error, search };
}

