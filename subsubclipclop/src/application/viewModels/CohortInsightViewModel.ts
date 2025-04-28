// /application/viewModels/CohortInsightViewModel.ts
import { useState, useEffect } from "react";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";
import { fetchCohortInsight } from "@/application/useCases/FetchCohortInsightData.ts"

/**
 * React hook that manages the state and lifecycle for fetching cohort insight data.
 *
 * Returns an object containing the fetched data, loading status, and any error message encountered during the fetch.
 *
 * @returns An object with `data`, `loading`, and `error` properties representing the current state of the cohort insight fetch operation.
 */
export function useCohortInsightViewModel() {
  const [data, setData] = useState<CohortAnalysisInsightResponseDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const result = await fetchCohortInsight(); // ✅ useCase 호출
        setData(result);

      } catch (e) {
        setError("인사이트 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
