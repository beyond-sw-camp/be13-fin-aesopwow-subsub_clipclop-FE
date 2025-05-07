// /infrastructure/repositories/SegmentRepositoryImpl.ts
import { fetchSegmentSearchResultApi } from "@/infrastructure/api/segmentApi.ts";

export class SegmentRepositoryImpl {
  async fetchSegmentSearchResult(keyword: string, tag: string) {
    const rawData = await fetchSegmentSearchResultApi(keyword, tag);
    return {
      field: rawData.field,
      problem: rawData.problem,
      actions: rawData.actions,
    };
  }
}
