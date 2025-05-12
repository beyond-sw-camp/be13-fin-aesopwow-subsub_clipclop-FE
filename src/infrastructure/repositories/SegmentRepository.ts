// /infrastructure/repositories/SegmentRepository.ts

import { fetchSegmentSearchResultApi } from "@/infrastructure/api/segmentApi";
import { SegmentSearchResult } from "@/core/model/SegmentModel";

export class SegmentRepository {
  // MARK: - 세그먼트 검색 결과
  async fetchSegmentSearchResult(keyword: string, tag: string): Promise<SegmentSearchResult> {
    const rawData = await fetchSegmentSearchResultApi(keyword, tag);
    return {
      field: rawData.field,
      problem: rawData.problem,
      actions: rawData.actions,
    };
  }
}
