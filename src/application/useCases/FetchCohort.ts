// /application/useCases/FetchCohort.ts
import { CohortRepository } from "@/infrastructure/repositories/CohortRepository.ts";

const repository = new CohortRepository();

// MARK: - 행동 패턴 데이터 가져오기
export async function fetchCohortBehaviorPattern() {
    return await repository.fetchBehaviorPattern();
}

// MARK: - 잔존율 히트맵 데이터 가져오기
export async function fetchCohortRemainHeatmap() {
    return await repository.fetchRemainHeatmap();
}

// MARK: - 인사이트 데이터 가져오기
export async function fetchCohortInsight() {
    return await repository.fetchInsight();
}