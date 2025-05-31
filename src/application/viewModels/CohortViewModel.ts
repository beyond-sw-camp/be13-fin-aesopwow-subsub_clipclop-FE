// 📁 /src/application/viewModels/CohortViewModel.ts
import { useState, useEffect } from "react";
import {
  fetchCohortFullAnalysis,
  fetchDoubleCohortFullAnalysis,
} from "@/application/useCases/CohortUsecase";
import { ChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";

interface HeatmapCell {
  row: string;
  col: string;
  value: string;
}

interface CohortResult {
  heatmap: HeatmapCell[];
  doughnutChart: ChartData<"doughnut", number[], unknown> | null;
  lineChart: ChartData<"line", number[], unknown> | null;
  insight: string;
  userData: CohortSingleUserResponse[];
}

// ✅ 단일 Cohort 분석 ViewModel
export function useCohortSingleAnalysisViewModel(clusterType: string) {
  const [result, setResult] = useState<CohortResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCohortFullAnalysis(clusterType);
        setResult({
          ...data,
          doughnutChart: data.doughnutChart as ChartData<"doughnut", number[], unknown>,
          lineChart: data.lineChart as ChartData<"line", number[], unknown>,
        });
      } catch (e) {
        setError(e instanceof Error ? e : new Error("단일 Cohort 분석 실패"));
      } finally {
        setIsLoading(false);
      }
    };

    if (clusterType) {
      load();
    }
  }, [clusterType]);

  return {
    heatmap: result?.heatmap ?? [],
    doughnutChart: result?.doughnutChart ?? null,
    lineChart: result?.lineChart ?? null,
    insight: result?.insight ?? "",
    userData: result?.userData ?? [],
    isLoading,
    error,
  };
}

// ✅ 이중 Cohort 분석 ViewModel
export function useCohortDoubleAnalysisViewModel(
  firstClusterType: string,
  secondClusterType: string
) {
  const [resultA, setResultA] = useState<CohortResult | null>(null);
  const [resultB, setResultB] = useState<CohortResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setIsLoading(true);
        const results = await fetchDoubleCohortFullAnalysis(
          firstClusterType,
          secondClusterType
        );

        setResultA({
          ...results[0],
          doughnutChart: results[0].doughnutChart as ChartData<"doughnut", number[], unknown>,
          lineChart: results[0].lineChart as ChartData<"line", number[], unknown>,
        });

        setResultB({
          ...results[1],
          doughnutChart: results[1].doughnutChart as ChartData<"doughnut", number[], unknown>,
          lineChart: results[1].lineChart as ChartData<"line", number[], unknown>,
        });
      } catch (e) {
        setError(e instanceof Error ? e : new Error("이중 Cohort 분석 실패"));
      } finally {
        setIsLoading(false);
      }
    };

    if (
      firstClusterType &&
      secondClusterType &&
      firstClusterType !== secondClusterType
    ) {
      load();
    }
  }, [firstClusterType, secondClusterType]);

  return {
    resultA: {
      heatmap: resultA?.heatmap ?? [],
      doughnutChart: resultA?.doughnutChart ?? null,
      lineChart: resultA?.lineChart ?? null,
      insight: resultA?.insight ?? "",
      userData: resultA?.userData ?? [],
    },
    resultB: {
      heatmap: resultB?.heatmap ?? [],
      doughnutChart: resultB?.doughnutChart ?? null,
      lineChart: resultB?.lineChart ?? null,
      insight: resultB?.insight ?? "",
      userData: resultB?.userData ?? [],
    },
    isLoading,
    error,
  };
}
