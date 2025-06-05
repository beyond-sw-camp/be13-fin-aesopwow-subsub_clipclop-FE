// 📁 /src/application/viewModels/CohortViewModel.ts
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  RequestCohortAnalysisUseCase,
  GetCohortHistoryUseCase,
  GetCohortResultCsvUseCase,
  fetchCohortFullAnalysis,
  fetchDoubleCohortFullAnalysis,
} from "@/application/useCases/CohortUsecase";
import { ChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";
import { getUser, useUserStore } from "@/application/stores/UserStore";
import { sendAlarm } from "@/infrastructure/api/Alarm";

import { CohortRepository } from "@/infrastructure/repositories/CohortRepository";
import { CohortRequestDto, CohortFileInfo } from "@/core/model/CohortModels";
import { parseCsvToCohortResult } from "@/core/utils/csvParser";


const clusterMap: Record<string, number> = {
  PCL: 1,
  SubscriptionType: 2,
  FavGenre: 3,
  LastLogin: 4,
};

// 분석 요청
export function useSingleClusterViewModel() {
  const [selectedCluster, setSelectedCluster] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const infoDbNo = useUserStore((state) => state.infoDbNo);
  const navigate = useNavigate();

  const requestAnalysis = async () => {
    if (!selectedCluster) {
      alert("군집을 선택하세요!");
      return;
    }

    if (!infoDbNo) {
      alert("infoDbNo가 설정되지 않았습니다.");
      return;
    }

    const analysisNo = clusterMap[selectedCluster];
    if (!analysisNo) {
      alert("선택한 군집에 해당하는 분석 코드가 없습니다.");
      return;
    }

    const dto: CohortRequestDto = {
      infoDbNo,
      analysisNo,
      targetTableUser: "user_info",
      targetTableSub: "user_sub_info",
      targetDate: "2025-01-01",
      filename: `${selectedCluster}_cohort.csv`,
    };

    const useCase = new RequestCohortAnalysisUseCase(new CohortRepository());

    try {
      setLoading(true);
      await useCase.execute(dto);

      navigate("/analytics/single/requirelist");
    } catch (error) {
      console.error("분석 요청 실패:", error);
      alert("분석 요청 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    selectedCluster,
    setSelectedCluster,
    requestAnalysis,
    loading,
  };
}

// 분석 리스트
export function useCohortHistoryViewModel(clusterType: string) {
  const [history, setHistory] = useState<CohortFileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const infoDbNo = useUserStore((state) => state.infoDbNo);

  useEffect(() => {
    const fetch = async () => {
      if (!infoDbNo || !clusterType) return;

      const analysisNo = clusterMap[clusterType];
      const useCase = new GetCohortHistoryUseCase(new CohortRepository());

      try {
        setLoading(true);
        const result = await useCase.execute(infoDbNo, analysisNo);
        setHistory(result);
      } catch (err) {
        console.error("분석 이력 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [infoDbNo, clusterType]);

  return {
    history,
    loading,
  };
}

// 분석 결과
interface CohortResult {
  heatmap: any[];
  doughnutChart: ChartData<"doughnut", number[]> | null;
  lineChart: ChartData<"line", number[]> | null;
  insight: string;
  userData: CohortSingleUserResponse[];
}

export function useCohortSingleCsvResultViewModel({
  clusterType,
  infoDbNo,
  filename,
}: {
  clusterType: string;
  infoDbNo: number;
  filename: string;
}) {
  const [result, setResult] = useState<CohortResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const analysisNo = clusterMap[clusterType];
        const useCase = new GetCohortResultCsvUseCase(new CohortRepository());
        const csvData = await useCase.execute(infoDbNo, analysisNo, filename);

        const parsed = parseCsvToCohortResult(csvData); // 💡 CSV → 차트 데이터 변환 유틸

        setResult(parsed);
      } catch (e) {
        setError(e instanceof Error ? e : new Error("CSV 분석 실패"));
      } finally {
        setIsLoading(false);
      }
    };

    if (clusterType && infoDbNo && filename) {
      load();
    }
  }, [clusterType, infoDbNo, filename]);

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

// 분석 결과
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

        // 성공 알림 전송
        const { userNo } = getUser();
        if (typeof userNo === "number") {
          await sendAlarm(userNo, "코호트 분석이 완료되었습니다.");
        }
      } catch (e) {
        const err = e instanceof Error ? e : new Error("이중 Cohort 분석 실패");
        setError(err);

        // 실패 알림 단 1회 전송
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
