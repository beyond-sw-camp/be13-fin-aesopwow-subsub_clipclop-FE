// /application/useCases/FetchSegmentSearchResultData.ts
import { SegmentSearchRepositoryImpl } from "@/infrastructure/repositories/SegmentSearchRepositoryImpl";

const repository = new SegmentSearchRepositoryImpl();

export async function fetchSegmentSearchResult(keyword: string, tag: string) {
  return await repository.fetchSegmentSearchResult(keyword, tag);
}
