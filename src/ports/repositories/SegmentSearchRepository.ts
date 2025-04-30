// /ports/repositories/SegmentSearchRepository.ts

import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto.ts";

export interface SegmentSearchRepository {
  fetchSegmentSearchResult(keyword: string, tag: string): Promise<SegmentSearchResultResponseDto>;
}
