// /infrastructure/repositories/SegmentSearchRepositoryImpl.ts

import { SegmentSearchRepository } from "@/ports/repositories/SegmentSearchRepository.ts";
import { fetchSegmentSearchResultApi } from "@/infrastructure/api/segmentSearchApi.ts";
import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto.ts";

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
