// /infrastructure/repositories/SegmentSearchRepositoryImpl.ts

import { SegmentSearchRepository } from "@/ports/repositories/SegmentSearchRepository";
import { fetchSegmentSearchResultApi } from "@/infrastructure/api/segmentSearchApi";
import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto";

export class SegmentSearchRepositoryImpl implements SegmentSearchRepository {
  async fetchSegmentSearchResult(keyword: string, tag: string): Promise<SegmentSearchResultResponseDto> {
    const rawData = await fetchSegmentSearchResultApi(keyword, tag);
    return {
      field: rawData.field,
      problem: rawData.problem,
      actions: rawData.actions,
    };
  }
}
