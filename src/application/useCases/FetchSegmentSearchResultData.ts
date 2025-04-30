// /application/useCases/FetchSegmentSearchResultData.ts

import { segmentSearchGateway } from "@/adapters/gateways/SegmentSearchGateway";
import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto"; // ✅ DTO만 사용

export async function fetchSegmentSearchResult(keyword: string, tag: string): Promise<SegmentSearchResultResponseDto> {
  return await segmentSearchGateway.fetchSegmentSearchResult(keyword, tag);
}
