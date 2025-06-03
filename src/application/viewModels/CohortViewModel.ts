// 📁 /src/application/viewModels/CohortViewModel.ts
import { useState, useEffect, useRef } from "react";
import {
  fetchCohortFullAnalysis,
  fetchDoubleCohortFullAnalysis,
} from "@/application/useCases/CohortUsecase";
import { ChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";
import { getUser } from "@/application/stores/UserStore";
import { sendAlarm } from "@/infrastructure/api/Alarm";

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
  const hasNotifiedRef = useRef(false);

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

        // ✅ 성공 알림 전송
        const { userNo } = getUser();
        if (typeof userNo === "number") {
          await sendAlarm(userNo, "코호트 분석이 완료되었습니다.");
        }
      } catch (e) {
        const err = e instanceof Error ? e : new Error("단일 Cohort 분석 실패");
        setError(err);

        // ✅ 실패 알림 단 1회 전송
        if (!hasNotifiedRef.current) {
          hasNotifiedRef.current = true;
          const { userNo } = getUser();
          if (typeof userNo === "number") {
            try {
              await sendAlarm(userNo, "코호트 분석 중 오류가 발생했습니다.");
            } catch (alarmError) {
              console.error("❌ 코호트 실패 알림 전송 실패:", alarmError);
            }
          }
        }
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
  const hasNotifiedRef = useRef(false);

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

        // ✅ 성공 알림 전송
        const { userNo } = getUser();
        if (typeof userNo === "number") {
          await sendAlarm(userNo, "코호트 분석이 완료되었습니다.");
        }
      } catch (e) {
        const err = e instanceof Error ? e : new Error("이중 Cohort 분석 실패");
        setError(err);

        // ✅ 실패 알림 단 1회 전송
        if (!hasNotifiedRef.current) {
          hasNotifiedRef.current = true;
          const { userNo } = getUser();
          if (typeof userNo === "number") {
            try {
              await sendAlarm(userNo, "코호트 분석 중 오류가 발생했습니다.");
            } catch (alarmError) {
              console.error("❌ 코호트 실패 알림 전송 실패:", alarmError);
            }
          }
        }
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
