// 📁 /src/application/useCases/CohortUsecase.ts
import { CohortRepository } from "@/infrastructure/repositories/CohortRepository";
import { ChartData as DoughnutChartData, ChartData as LineChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";

import { CohortRequestDto, CohortFileInfo } from "@/core/model/CohortModels";

const repository = new CohortRepository();

// 분석 요청
export class RequestCohortAnalysisUseCase {
  constructor(private readonly repository: CohortRepository) {}

  async execute(dto: CohortRequestDto): Promise<void> {
    await this.repository.requestCohort(dto);
  }
}

// 분석 리스트
export class GetCohortHistoryUseCase {
  constructor(private readonly repository: CohortRepository) {}

  async execute(infoDbNo: number, analysisNo: number): Promise<CohortFileInfo[]> {
    return await this.repository.getCohortHistory(infoDbNo, analysisNo);
  }
}

// 분석 결과
export class GetCohortResultCsvUseCase {
  constructor(private readonly repository: CohortRepository) {}

  async execute(infoDbNo: number, analysisNo: number, filename: string): Promise<string> {
    return await this.repository.fetch(infoDbNo, analysisNo, filename);
  }
}


interface HeatmapCell {
  row: string;
  col: string;
  value: string;
}


/**
 * 📌 단일 Cohort 분석 전체 결과 요청
 * @param clusterType - 사용자 선택 군집 (예: "장르", "활동")
 */
export async function fetchCohortFullAnalysis(
  clusterType: string
): Promise<{
  heatmap: HeatmapCell[];
  doughnutChart: DoughnutChartData;
  lineChart: LineChartData<"line", number[]>;
  insight: string;
  userData: CohortSingleUserResponse[];
}> {
  const result = await repository.fetchCohortCsvParsed({ clusterType });
  return result[0]; // ✅ 단일 분석이므로 첫 번째 결과만 사용
}

/**
 * 📌 이중 Cohort 분석 전체 결과 요청
 * @param firstClusterType - 첫 번째 군집
 * @param secondClusterType - 두 번째 군집
 */
export async function fetchDoubleCohortFullAnalysis(
  firstClusterType: string,
  secondClusterType: string
): Promise<
  {
    heatmap: HeatmapCell[];
    doughnutChart: DoughnutChartData;
    lineChart: LineChartData<"line", number[]>;
    insight: string;
    userData: CohortSingleUserResponse[];
  }[]
> {
  return await repository.fetchCohortCsvParsed({
    firstClusterType,
    secondClusterType,
  });
}