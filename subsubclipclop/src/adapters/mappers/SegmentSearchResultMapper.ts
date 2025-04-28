// /adapters/mappers/SegmentSearchResultMapper.ts

import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto";

/**
 * Maps a backend segment search result response to a simplified object structure.
 *
 * @param keyword - The search keyword associated with the result.
 * @param tag - The tag used for categorizing the result.
 * @param responseDto - The backend response containing segment search result details.
 * @returns An object containing the input {@link keyword}, {@link tag}, and selected properties from {@link responseDto}.
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
