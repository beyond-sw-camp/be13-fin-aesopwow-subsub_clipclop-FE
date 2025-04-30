// /application/useCases/FetchSegmentSearchResultData.ts

import { segmentSearchGateway } from "@/adapters/gateways/SegmentSearchGateway.ts"; // ✅ DTO만 사용
import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto.ts"; // ✅ DTO만 사용

export async function fetchSegmentSearchResult(keyword: string, tag: string): Promise<SegmentSearchResultResponseDto> {
  return await segmentSearchGateway.fetchSegmentSearchResult(keyword, tag);
}
