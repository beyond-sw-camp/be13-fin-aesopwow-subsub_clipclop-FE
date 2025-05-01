// /infrastructure/repositories/SegmentSearchRepositoryImpl.ts
import { fetchSegmentSearchResultApi } from "@/infrastructure/api/segmentSearchApi.ts";

export class SegmentSearchRepositoryImpl {
  async fetchSegmentSearchResult(keyword: string, tag: string) {
    const rawData = await fetchSegmentSearchResultApi(keyword, tag);
    return {
      field: rawData.field,
      problem: rawData.problem,
      actions: rawData.actions,
    };
  }
}
