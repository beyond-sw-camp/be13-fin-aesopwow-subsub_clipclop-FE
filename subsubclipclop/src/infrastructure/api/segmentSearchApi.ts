/**
 * Fetches segment search results from the API using the provided keyword and tag.
 *
 * @param keyword - The search term to query segments.
 * @param tag - The tag to filter segment results.
 * @returns A promise that resolves to the parsed JSON response containing segment search results.
 */
export async function fetchSegmentSearchResultApi(keyword: string, tag: string) {
  const query = new URLSearchParams({ keyword, tag }).toString();
  return fetch(`/api/segment-search?${query}`)
    .then((res) => res.json());
}

// (데이터 바인딩 테스트)
// /infrastructure/api/segmentSearchApi.ts

// export async function fetchSegmentSearchResultApi(keyword: string, tag: string) {
//   const response = await fetch("/mock/segment-search-result.json");
  
//   if (!response.ok) {
//     throw new Error("검색 결과를 불러오는 데 실패했습니다.");
//   }
  
//   return await response.json();
// }