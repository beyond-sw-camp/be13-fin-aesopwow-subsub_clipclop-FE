// /src/application/viewModels/CohortViewModel.ts
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  RequestCohortAnalysisUseCase,
  GetCohortHistoryUseCase,
  GetCohortResultCsvUseCase,
} from "@/application/useCases/CohortUsecase";
import { ChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";
import { useUserStore } from "@/application/stores/UserStore";

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

      navigate(`/analytics/single/requirelist?clusterType=${encodeURIComponent(selectedCluster)}`);
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
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const infoDbNo = useUserStore((state) => state.infoDbNo);
  const PAGE_SIZE = 10;

  const fetch = async (pageNumber: number) => {
    if (!infoDbNo || !clusterType) return;

    const analysisNo = clusterMap[clusterType];
    const useCase = new GetCohortHistoryUseCase(new CohortRepository());

    try {
      setLoading(true);
      const result = await useCase.execute(infoDbNo, analysisNo);

      const start = pageNumber * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      const newItems = result.slice(start, end);

      if (newItems.length < PAGE_SIZE) {
        setHasMore(false);
      }

      setHistory((prev) => [...prev, ...newItems]);
    } catch (err) {
      console.error("분석 이력 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setHistory([]);
    setPage(0);
    setHasMore(true);
  }, [clusterType, infoDbNo]);

  useEffect(() => {
    fetch(page);
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return {
    history,
    loading,
    hasMore,
    loadMore,
  };
}

// 분석 결과
interface CohortResult {
  heatmap: any[];
  doughnutChart: ChartData<"doughnut", number[]> | null;
  lineChart: ChartData<"line", number[]> | null;
  insight: string;
  userData: CohortSingleUserResponse[];
  groupData: Record<string, number[]>;
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

        const cleanFilename = filename.replace(/\.csv$/, "");

        const csvData = await useCase.execute(infoDbNo, analysisNo, cleanFilename);

        const parsed = parseCsvToCohortResult(csvData);
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
    groupData: result?.groupData ?? {},
    isLoading,
    error,
  };
}

// double 분석 요청
export function useDoubleClusterViewModel() {
  const [firstCluster, setFirstCluster] = useState<string>("");
  const [secondCluster, setSecondCluster] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const infoDbNo = useUserStore((state) => state.infoDbNo);
  const navigate = useNavigate();

  const requestAnalysis = async () => {
    if (!firstCluster || !secondCluster) {
      alert("두 개의 군집을 모두 선택하세요!");
      return;
    }

    if (firstCluster === secondCluster) {
      alert("서로 다른 군집을 선택해주세요!");
      return;
    }

    if (!infoDbNo) {
      alert("infoDbNo가 설정되지 않았습니다.");
      return;
    }

    const analysisNo1 = clusterMap[firstCluster];
    const analysisNo2 = clusterMap[secondCluster];

    if (!analysisNo1 || !analysisNo2) {
      alert("선택한 군집에 해당하는 분석 코드가 없습니다.");
      return;
    }

    const useCase = new RequestCohortAnalysisUseCase(new CohortRepository());

    // DTO 생성 헬퍼 함수
    const createCohortDto = (clusterName: string, analysisNo: number): CohortRequestDto => ({
      infoDbNo,
      analysisNo,
      targetTableUser: "user_info",
      targetTableSub: "user_sub_info",
      targetDate: "2025-01-01",
      filename: `${clusterName}_cohort.csv`,
    });

    try {
      setLoading(true);

      const dto1 = createCohortDto(firstCluster, analysisNo1);
      const dto2 = createCohortDto(secondCluster, analysisNo2);

      // 병렬 분석 요청
      await Promise.all([useCase.execute(dto1), useCase.execute(dto2)]);

      // 분석 이력 페이지로 이동
      navigate(
        `/analytics/double/requirelist?` +
          `firstClusterType=${encodeURIComponent(firstCluster)}&` +
          `secondClusterType=${encodeURIComponent(secondCluster)}`
      );
    } catch (error) {
      console.error("분석 요청 실패:", error);
      alert("분석 요청 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    firstCluster,
    setFirstCluster,
    secondCluster,
    setSecondCluster,
    requestAnalysis,
    loading,
  };
}