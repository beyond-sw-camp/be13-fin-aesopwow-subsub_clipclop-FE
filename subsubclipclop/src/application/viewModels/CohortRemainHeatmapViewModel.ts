// /application/viewModels/CohortRemainHeatmapViewModel.ts
import { useState, useEffect } from "react";
import { CohortAnalysisRemainHitmapResponseDto } from "@/core/cohort/CohortAnalysisRemainHitmapResponseDto";
import { fetchCohortRemainHeatmap } from "@/application/useCases/FetchCohortRemainHeatmapData.ts";

/**
 * React hook for fetching and managing the state of cohort remain heatmap data.
 *
 * Returns the current heatmap data, loading status, and any error message encountered during fetch.
 *
 * @returns An object containing `data` (the fetched heatmap data or null), `loading` (whether the fetch is in progress), and `error` (an error message or null).
 */
export function useCohortRemainHeatmapViewModel() {
  const [data, setData] = useState<CohortAnalysisRemainHitmapResponseDto | null>(null);
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
