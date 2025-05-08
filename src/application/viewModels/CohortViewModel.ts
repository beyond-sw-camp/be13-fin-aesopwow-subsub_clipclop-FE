import { useState, useEffect } from "react";
import {
  fetchCohortVisualization,
  fetchCohortInsight,
  fetchCohortRemainHeatmap,
} from "@/application/useCases/CohortUsecase";

// MARK: - Visualization
export function useCohortVisualizationViewModel(clusterType: string) {
  const [data, setData] = useState<{
    title: string;
    visualizationImage1Base64: string;
    visualizationImage2Base64: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchCohortVisualization(clusterType);
        setData(result);
      } catch {
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clusterType]);

  return { data, loading, error };
}

// MARK: - Insight
export function useCohortInsightViewModel(clusterType: string) {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchCohortInsight(clusterType);
        setData(result);
      } catch {
        setError("인사이트 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clusterType]);

  return { data, loading, error };
}

// MARK: - RemainHeatmap
export function useCohortRemainHeatmapViewModel(clusterType: string) {
  const [data, setData] = useState<{
    title: string;
    content: string;
    columnLabels: string[];
    dataRows: string[][];
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchCohortRemainHeatmap(clusterType);
        setData(result);
      } catch {
        setError("잔존율 히트맵 데이터를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clusterType]);

  return { data, loading, error };
}