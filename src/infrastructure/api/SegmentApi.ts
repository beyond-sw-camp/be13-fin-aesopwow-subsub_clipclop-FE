// /infrastructure/api/SegmentApi.ts

// MARK: - 세그먼트 검색 API
export async function fetchSegmentSearchResultApi(keyword: string, tag: string) {
  const query = new URLSearchParams({ keyword, tag }).toString();
  
  return fetch(`/api/segment-search?${query}`).then((res) => res.json());
}
