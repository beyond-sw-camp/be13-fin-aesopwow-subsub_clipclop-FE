// /src/application/useCases/CohortUsecase.ts
import { CohortRepository } from "@/infrastructure/repositories/CohortRepository.ts";
import { CustomError } from "@/error/CustomError";
import { ErrorCode } from "@/error/ErrorCode";

const repository = new CohortRepository();

// MARK: - Single 시각화
export async function fetchCohortSingleVisualization(clusterType: string) {
  if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
  return await repository.fetchSingleVisualization(clusterType);
}

// MARK: - Single 인사이트
export async function fetchCohortSingleInsight(clusterType: string) {
  if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
  return await repository.fetchSingleInsight(clusterType);
}

// MARK: - Single 히트맵
export async function fetchCohortSingleRemainHeatmap(clusterType: string) {
  if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
  return await repository.fetchSingleRemainHeatmap(clusterType);
}

// MARK: - Single 유저 데이터
export async function fetchCohortSingleUserDataSearchResult(clusterType: string, fields: string[]) {
  if (!clusterType || !fields?.length) {
    throw new CustomError(ErrorCode.INVALID_PARAMS);
  }
  return await repository.fetchSingleUserDataSearchResult(clusterType, fields);
}

// MARK: - Double 시각화
export async function fetchCohortDoubleVisualization(firstClusterType: string, secondClusterType: string) {
  if (!firstClusterType || !secondClusterType) {
    throw new CustomError(ErrorCode.INVALID_PARAMS);
  }
  return await repository.fetchDoubleVisualization(firstClusterType, secondClusterType);
}

// MARK: - Double 인사이트
export async function fetchCohortDoubleInsight(firstClusterType: string, secondClusterType: string) {
  if (!firstClusterType || !secondClusterType) {
    throw new CustomError(ErrorCode.INVALID_PARAMS);
  }
  return await repository.fetchDoubleInsight(firstClusterType, secondClusterType);
}

// MARK: - Double 히트맵
export async function fetchCohortDoubleRemainHeatmap(firstClusterType: string, secondClusterType: string) {
  if (!firstClusterType || !secondClusterType) {
    throw new CustomError(ErrorCode.INVALID_PARAMS);
  }
  return await repository.fetchDoubleRemainHeatmap(firstClusterType, secondClusterType);
}

// MARK: - Double 유저 데이터
export async function fetchCohortDoubleUserDataSearchResult(
  firstClusterType: string,
  secondClusterType: string,
  fields: string[]
) {
  if (!firstClusterType || !secondClusterType || !fields?.length) {
    throw new CustomError(ErrorCode.INVALID_PARAMS);
  }
  return await repository.fetchDoubleUserDataSearchResult(firstClusterType, secondClusterType, fields);
}