import { CohortRepository } from "@/infrastructure/repositories/CohortRepository.ts";

const repository = new CohortRepository();

// MARK: - Single 시각화
export async function fetchCohortSingleVisualization(clusterType: string) {
  return await repository.fetchSingleVisualization(clusterType);
}

// MARK: - Single 인사이트
export async function fetchCohortSingleInsight(clusterType: string) {
  return await repository.fetchSingleInsight(clusterType);
}

// MARK: - Single 히트맵
export async function fetchCohortSingleRemainHeatmap(clusterType: string) {
  return await repository.fetchSingleRemainHeatmap(clusterType);
}

// MARK: - Single 유저 데이터
export async function fetchCohortSingleUserDataSearchResult(clusterType: string, fields: string[]) {
  return await repository.fetchSingleUserDataSearchResult(clusterType, fields);
}

// MARK: - Double 시각화
export async function fetchCohortDoubleVisualization(firstClusterType: string, secondClusterType: string) {
  return await repository.fetchDoubleVisualization(firstClusterType, secondClusterType);
}

// MARK: - Double 인사이트
export async function fetchCohortDoubleInsight(firstClusterType: string, secondClusterType: string) {
  return await repository.fetchDoubleInsight(firstClusterType, secondClusterType);
}

// MARK: - Double 히트맵
export async function fetchCohortDoubleRemainHeatmap(firstClusterType: string, secondClusterType: string) {
  return await repository.fetchDoubleRemainHeatmap(firstClusterType, secondClusterType);
}

// MARK: - Double 유저 데이터
export async function fetchCohortDoubleUserDataSearchResult(
  firstClusterType: string,
  secondClusterType: string,
  fields: string[]
) {
  return await repository.fetchDoubleUserDataSearchResult(firstClusterType, secondClusterType, fields);
}