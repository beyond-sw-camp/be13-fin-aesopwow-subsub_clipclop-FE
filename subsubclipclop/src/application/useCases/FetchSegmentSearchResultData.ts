// /application/useCases/FetchSegmentSearchResultData.ts

import { segmentSearchGateway } from "@/adapters/gateways/SegmentSearchGateway";
import { SegmentSearchResultResponseDto } from "@/core/segment/SegmentSearchResultResponseDto"; /**
 * Retrieves segment search results matching the specified keyword and tag.
 *
 * @param keyword - The search term to filter segments.
 * @param tag - The tag to further refine the search results.
 * @returns A promise resolving to the segment search result data transfer object.
 */

export async function fetchSegmentSearchResult(keyword: string, tag: string): Promise<SegmentSearchResultResponseDto> {
  return await segmentSearchGateway.fetchSegmentSearchResult(keyword, tag);
}
