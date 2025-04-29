// /application/viewModels/CohortInsightViewModel.ts
import { useState, useEffect } from "react";
import { CohortAnalysisInsightResponseDto } from "@/core/cohort/CohortAnalysisInsightResponseDto";
import { fetchCohortInsight } from "@/application/useCases/FetchCohortInsightData.ts"

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
