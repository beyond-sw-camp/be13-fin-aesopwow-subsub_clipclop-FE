// /src/application/viewModels/CohortViewModel.ts
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

import { ErrorResponse } from "@/error/ErrorResponse";
import { CustomError } from "@/error/CustomError";
import { ErrorCode } from "@/error/ErrorCode";

// MARK: - Single 시각화
export function useCohortSingleVisualizationViewModel(clusterType: string) {
  const [data, setData] = useState<CohortSingleVisualizationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
        setIsLoading(true);
        const result = await fetchCohortSingleVisualization(clusterType);
        setData(result);
        setError(null);
      } catch (e) {
        setError(new ErrorResponse(e));
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
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
        setIsLoading(true);
        const result = await fetchCohortSingleInsight(clusterType);
        setData(result);
        setError(null);
      } catch (e) {
        setError(new ErrorResponse(e));
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
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
        setIsLoading(true);
        const result = await fetchCohortSingleRemainHeatmap(clusterType);
        setData(result);
        setError(null);
      } catch (e) {
        setError(new ErrorResponse(e));
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
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (clusterType: string, fields: string[]) => {
    try {
      if (!clusterType || !fields.length) throw new CustomError(ErrorCode.INVALID_PARAMS);
      setIsLoading(true);
      const result = await fetchCohortSingleUserDataSearchResult(clusterType, fields);
      setData(result);
      setError(null);
    } catch (e) {
      setError(new ErrorResponse(e));
    } finally {
      setIsLoading(false);
    }
  };

  return { data, error, isLoading, search };
}

// MARK: - Double 시각화
export function useCohortDoubleVisualizationViewModel(firstClusterType: string, secondClusterType: string) {
  const [data, setData] = useState<CohortDoubleVisualizationResponse | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
        setIsLoading(true);
        const result = await fetchCohortDoubleVisualization(firstClusterType, secondClusterType);
        setData(result);
        setError(null);
      } catch (e) {
        setError(new ErrorResponse(e));
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
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
        setIsLoading(true);
        const result = await fetchCohortDoubleInsight(firstClusterType, secondClusterType);
        setData(result);
        setError(null);
      } catch (e) {
        setError(new ErrorResponse(e));
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
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);
        setIsLoading(true);
        const result = await fetchCohortDoubleRemainHeatmap(firstClusterType, secondClusterType);
        setData(result);
        setError(null);
      } catch (e) {
        setError(new ErrorResponse(e));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [firstClusterType, secondClusterType]);

  return { data, error, isLoading };
}

// MARK: - Double 유저 데이터
export function useCohortDoubleUserDataSearchResultViewModel() {
  const [firstData, setFirstData] = useState<CohortDoubleUserResponse[]>([]);
  const [secondData, setSecondData] = useState<CohortDoubleUserResponse[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (firstClusterType: string, secondClusterType: string, fields: string[]) => {
    try {
      if (!firstClusterType || !secondClusterType || !fields.length) {
        throw new CustomError(ErrorCode.INVALID_PARAMS);
      }
      setIsLoading(true);
      const result = await fetchCohortDoubleUserDataSearchResult(firstClusterType, secondClusterType, fields);
      setFirstData(result.firstTableData);
      setSecondData(result.secondTableData);
      setError(null);
    } catch (e) {
      setError(new ErrorResponse(e));
    } finally {
      setIsLoading(false);
    }
  };

  return { firstData, secondData, error, isLoading, search };
}