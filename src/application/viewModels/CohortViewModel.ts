import { useState, useEffect } from "react";
import {
  fetchCohortSingleVisualization,
  fetchCohortSingleInsight,
  fetchCohortSingleRemainHeatmap,
  fetchCohortSingleUserDataSearchResult,
  fetchCohortDoubleInsight,
  fetchCohortDoubleVisualization,
  fetchCohortDoubleRemainHeatmap,
  fetchCohortDoubleUserDataSearchResult
} from "@/application/useCases/CohortUsecase";

import {
  CohortSingleUserResponse,
  CohortSingleInsightResponse,
  CohortSingleHeatmapResponse,
  CohortSingleVisualizationResponse,
  CohortDoubleInsightResponse,
  CohortDoubleVisualizationResponse,
  CohortDoubleHeatmapResponse,
  CohortDoubleUserResponse
} from "@/core/model/CohortModel";

// MARK: - Single 시각화
export function useCohortSingleVisualizationViewModel(clusterType: string) {
  const [data, setData] = useState<CohortSingleVisualizationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCohortSingleVisualization(clusterType);
        setData(result);
      } catch {
        setError("시각화 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [clusterType]);

  return { data, isLoading, error };
}

// MARK: - Single 인사이트
export function useCohortSingleInsightViewModel(clusterType: string) {
  const [data, setData] = useState<CohortSingleInsightResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCohortSingleInsight(clusterType);
        setData(result);
      } catch {
        setError("인사이트 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [clusterType]);

  return { data, isLoading, error };
}

// MARK: - Single 히트맵
export function useCohortSingleRemainHeatmapViewModel(clusterType: string) {
  const [data, setData] = useState<CohortSingleHeatmapResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCohortSingleRemainHeatmap(clusterType);
        setData(result);
      } catch {
        setError("잔존율 히트맵 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [clusterType]);

  return { data, isLoading, error };
}

// MARK: - Single 유저 데이터
export function useSingleUserDataSearchResultViewModel() {
  const [data, setData] = useState<CohortSingleUserResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 

  const search = async (clusterType: string, fields: string[]) => {
    try {
      setIsLoading(true);
      const result = await fetchCohortSingleUserDataSearchResult(clusterType, fields);
      setData(result);
      setError(null);
    } catch {
      setError("유저 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    isLoading,
    search,
  };
}

// MARK: - Double 시각화
export function useCohortDoubleVisualizationViewModel(firstClusterType: string, secondClusterType: string) {
  const [data, setData] = useState<CohortDoubleVisualizationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCohortDoubleVisualization(firstClusterType, secondClusterType);
        setData(result);
      } catch {
        setError("Double 시각화 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [firstClusterType, secondClusterType]);

  return { data, error, isLoading };
}

// MARK: - Double 인사이트
export function useCohortDoubleInsightViewModel(firstClusterType: string, secondClusterType: string) {
  const [data, setData] = useState<CohortDoubleInsightResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCohortDoubleInsight(firstClusterType, secondClusterType);
        setData(result);
      } catch {
        setError("Double 인사이트 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [firstClusterType, secondClusterType]);

  return { data, error, isLoading };
}

// MARK: - Double 히트맵
export function useCohortDoubleRemainHeatmapViewModel(firstClusterType: string, secondClusterType: string) {
  const [data, setData] = useState<CohortDoubleHeatmapResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCohortDoubleRemainHeatmap(firstClusterType, secondClusterType);
        setData(result);
      } catch {
        setError("Double 히트맵 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [firstClusterType, secondClusterType]);

  return { data, error, isLoading };
}

// MARK: - Double 유저 데이터 ViewModel
export function useCohortDoubleUserDataSearchResultViewModel() {
  const [firstData, setFirstData] = useState<CohortDoubleUserResponse[]>([]);
  const [secondData, setSecondData] = useState<CohortDoubleUserResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (
    firstClusterType: string,
    secondClusterType: string,
    fields: string[]
  ) => {
    try {
      setIsLoading(true);
      const result = await fetchCohortDoubleUserDataSearchResult(firstClusterType, secondClusterType, fields);
      setFirstData(result.firstTableData);
      setSecondData(result.secondTableData);
      setError(null);
    } catch {
      setError("유저 데이터를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return { firstData, secondData, error, isLoading, search };
}