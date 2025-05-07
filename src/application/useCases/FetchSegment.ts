// /application/useCases/FetchSegment.ts
import { SegmentRepositoryImpl } from "@/infrastructure/repositories/SegmentRepositoryImpl.ts";

const repository = new SegmentRepositoryImpl();

export async function fetchSegmentSearchResult(keyword: string, tag: string) {
    return await repository.fetchSegmentSearchResult(keyword, tag);
}