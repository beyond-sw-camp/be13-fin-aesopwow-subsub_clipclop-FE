// /application/viewModels/CohortRemainHeatmapViewModel.ts
import { useState, useEffect } from "react";
import { CohortAnalysisRemainHeatmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHeatmapResponseDto.ts";
import { fetchCohortRemainHeatmap } from "@/application/useCases/FetchCohortRemainHeatmapData.ts";

export function useCohortRemainHeatmapViewModel() {
  const [data, setData] = useState<CohortAnalysisRemainHeatmapResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCohortRemainHeatmap();
        setData(result);
      } catch (err) {
        setError("잔존율 히트맵 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
