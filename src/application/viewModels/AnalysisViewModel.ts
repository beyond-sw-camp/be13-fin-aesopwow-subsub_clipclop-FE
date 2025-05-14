// /src/application/viewModels/AnalysisViewModel.ts
import { useState, useEffect } from "react";
import { fetchAnalysisFile } from "@/application/useCases/AnalysisUsecase";
import { ErrorResponse } from "@/error/ErrorResponse";
import { AnalysisFileRequestModel } from "@/core/model/AnalysisModel";

export function useAnalysisFileViewModel(params: AnalysisFileRequestModel) {
  const [data, setData] = useState<Blob | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const file = await fetchAnalysisFile(params);
        setData(file);
        setError(null);
      } catch (e) {
        setError(new ErrorResponse(e));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return { data, error, isLoading };
}