import { SegmentRepository } from "@/infrastructure/repositories/SegmentRepository.ts";

const repository = new SegmentRepository();

// MARK: - 세그먼트 검색 결과
export async function fetchSegmentSearchResult(keyword: string, tag: string) {
    return await repository.fetchSegmentSearchResult(keyword, tag);
}
