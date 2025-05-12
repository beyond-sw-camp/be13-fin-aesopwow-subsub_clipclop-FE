import { CohortRepository } from "@/infrastructure/repositories/CohortRepository.ts";

const repository = new CohortRepository();

// MARK: - 시각화 데이터
export async function fetchCohortVisualization(clusterType: string) {
  return await repository.fetchVisualization(clusterType);
}

// MARK: - 잔존율 히트맵 데이터
export async function fetchCohortRemainHeatmap(clusterType: string) {
  return await repository.fetchRemainHeatmap(clusterType);
}

// MARK: - 인사이트 데이터
export async function fetchCohortInsight(clusterType: string) {
  return await repository.fetchInsight(clusterType);
}