// /infrastructure/api/segmentSearchApi.ts
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