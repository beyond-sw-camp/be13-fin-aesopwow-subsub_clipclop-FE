// /application/viewModels/CohortInsightViewModel.ts

import { useState, useEffect } from "react";
import { fetchCohortInsight } from "@/application/useCases/FetchCohortInsightData";

export function useCohortInsightViewModel() {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchCohortInsight();
        setData(result);
      } catch {
        setError("인사이트 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
