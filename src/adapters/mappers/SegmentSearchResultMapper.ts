// /adapters/mappers/SegmentSearchResultMapper.ts

import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto";

/**
 * 백엔드에서 받은 ResponseDto를
 * 필요한 구조로 매핑해주는 매퍼
 */
export function SegmentSearchResultMapper(
  keyword: string,
  tag: string,
  responseDto: SegmentSearchResultResponseDto
) {
  return {
    keyword,
    tag,
    field: responseDto.field,
    problem: responseDto.problem,
    actions: responseDto.actions,
  };
}
