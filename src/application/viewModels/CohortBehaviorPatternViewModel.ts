// /application/viewModels/CohortBehaviorPatternViewModel.ts

import { useState, useEffect } from "react";
import { fetchCohortBehaviorPattern } from "@/application/useCases/FetchCohortBehaviorPatternData";

export function useCohortBehaviorPatternViewModel() {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchCohortBehaviorPattern();
        setData(result);
      } catch {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
