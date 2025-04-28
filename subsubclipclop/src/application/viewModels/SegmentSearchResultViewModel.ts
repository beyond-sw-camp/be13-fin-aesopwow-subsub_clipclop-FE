// /application/viewModels/SegmentSearchResultViewModel.ts

import { useState } from "react";
import { fetchSegmentSearchResult } from "@/application/useCases/FetchSegmentSearchResultData";
import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto"; /**
 * Custom React hook for managing segment search results and related state.
 *
 * Provides the current search result data, any error message, and a function to perform a segment search by keyword and tag.
 *
 * @returns An object containing the search result data, error message, and a search function.
 */

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
