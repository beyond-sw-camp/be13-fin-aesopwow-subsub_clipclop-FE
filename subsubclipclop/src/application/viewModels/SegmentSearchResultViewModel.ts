// /application/viewModels/SegmentSearchResultViewModel.ts

import { useState } from "react";
import { fetchSegmentSearchResult } from "@/application/useCases/FetchSegmentSearchResultData";
import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto"; // ✅ DTO 가져오기

export function useSegmentSearchResultViewModel() {
  const [data, setData] = useState<SegmentSearchResultResponseDto | null>(null); // ✅ 타입을 DTO로
  const [error, setError] = useState<string | null>(null);

  const search = async (keyword: string, tag: string) => {
    try {
      const result = await fetchSegmentSearchResult(keyword, tag);
      setData(result); // ✅ 바로 저장
      setError(null);
    } catch {
      setError("검색 결과를 불러오는 데 실패했습니다.");
    }
  };

  return { data, error, search };
}
