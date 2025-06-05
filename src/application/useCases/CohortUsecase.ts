// 📁 /src/application/useCases/CohortUsecase.ts
import { CohortRepository } from "@/infrastructure/repositories/CohortRepository";
import { ChartData as DoughnutChartData, ChartData as LineChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";

const repository = new CohortRepository();

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