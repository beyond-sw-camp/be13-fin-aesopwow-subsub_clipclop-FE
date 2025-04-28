// /application/viewModels/CohortBehaviorPatternViewModel.ts
import { useState, useEffect } from "react";
import { CohortAnalysisBehaviorPatternResponseDto } from "@/core/cohort/CohortAnalysisBehaviorPatternResponseDto.ts";
import { fetchCohortBehaviorPattern } from "@/application/useCases/FetchCohortBehaviorPatternData.ts";

export function useCohortBehaviorPatternViewModel() {
  const [data, setData] = useState<CohortAnalysisBehaviorPatternResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchCohortBehaviorPattern();
        setData(result);
      } catch (err) {
        setError("데이터를 불러오는 데 실패했습니다.");
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
