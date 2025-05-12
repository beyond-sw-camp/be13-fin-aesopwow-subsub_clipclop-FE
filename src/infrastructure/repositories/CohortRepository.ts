// /infrastructure/repositories/CohortRepository.ts
import {
  fetchSingleVisualizationApi,
  fetchSingleInsightApi,
  fetchSingleRemainHeatmapApi,
  fetchSingleUserDataSearchResultApi,
  fetchDoubleInsightApi,
  fetchDoubleVisualizationApi,
  fetchDoubleRemainHeatmapApi,
  fetchDoubleUserDataSearchResultApi
} from "@/infrastructure/api/CohortApi.ts";

import {
  CohortSingleVisualizationResponse,
  CohortSingleInsightResponse,
  CohortSingleHeatmapResponse,
  CohortSingleUserResponse,
  CohortDoubleInsightResponse,
  CohortDoubleVisualizationResponse,
  CohortDoubleHeatmapResponse,
  CohortDoubleUserResponse
} from "@/core/model/CohortModel";

export class CohortRepository {
  // MARK: - Single 시각화
  async fetchSingleVisualization(clusterType: string): Promise<CohortSingleVisualizationResponse> {
    if (!clusterType) {
      throw new Error("유효하지 않은 매개변수: clusterType은 필수입니다.");
    }

    try {
      const rawData = await fetchSingleVisualizationApi(clusterType);
      return {
        imageBase64A: rawData.imageBase64A,
        imageBase64B: rawData.imageBase64B
      };
    } catch (error) {
      console.error("❗ Single 시각화 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }

  // MARK: - Single 인사이트
  async fetchSingleInsight(clusterType: string): Promise<CohortSingleInsightResponse> {
    if (!clusterType) {
      throw new Error("유효하지 않은 매개변수: clusterType은 필수입니다.");
    }

    try {
      const rawData = await fetchSingleInsightApi(clusterType);
      return { content: rawData.content };
    } catch (error) {
      console.error("❗ Single 인사이트 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }

  // MARK: - Single 히트맵
  async fetchSingleRemainHeatmap(clusterType: string): Promise<CohortSingleHeatmapResponse> {
    if (!clusterType) {
      throw new Error("유효하지 않은 매개변수: clusterType은 필수입니다.");
    }

    try {
      const rawData = await fetchSingleRemainHeatmapApi(clusterType);
      return {
        content: rawData.content,
        columnLabels: rawData.columnLabels,
        dataRows: rawData.dataRows,
      };
    } catch (error) {
      console.error("❗ Single 히트맵 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }

  // MARK: - Single 유저 데이터
  async fetchSingleUserDataSearchResult(clusterType: string, fields: string[]): Promise<CohortSingleUserResponse[]> {
    if (!clusterType || !fields || fields.length === 0) {
      throw new Error("유효하지 않은 매개변수: clusterType과 fields는 필수입니다.");
    }

    try {
      const rawData = await fetchSingleUserDataSearchResultApi(clusterType, fields);
      return (rawData?.tableData ?? []) as CohortSingleUserResponse[];
    } catch (error) {
      console.error("❗ Single 유저 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }

  // MARK: - Double 시각화
  async fetchDoubleVisualization(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleVisualizationResponse> {
    if (!firstClusterType || !secondClusterType) {
      throw new Error("유효하지 않은 매개변수: firstClusterType과 secondClusterType은 필수입니다.");
    }

    try {
      const rawData = await fetchDoubleVisualizationApi(firstClusterType, secondClusterType);
      return {
        firstImageBase64A: rawData.firstImageBase64A,
        firstImageBase64B: rawData.firstImageBase64B,
        secondImageBase64A: rawData.secondImageBase64A,
        secondImageBase64B: rawData.secondImageBase64B
      };
    } catch (error) {
      console.error("❗ Double 시각화 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }

  // MARK: - Double 인사이트
  async fetchDoubleInsight(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleInsightResponse> {
    if (!firstClusterType || !secondClusterType) {
      throw new Error("유효하지 않은 매개변수: firstClusterType과 secondClusterType은 필수입니다.");
    }

    try {
      const rawData = await fetchDoubleInsightApi(firstClusterType, secondClusterType);
      return {
        firstContent: rawData.firstContent,
        secondContent: rawData.secondContent
      };
    } catch (error) {
      console.error("❗ Double 인사이트 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }

  // MARK: - Double 히트맵
  async fetchDoubleRemainHeatmap(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleHeatmapResponse> {
    if (!firstClusterType || !secondClusterType) {
      throw new Error("유효하지 않은 매개변수: firstClusterType과 secondClusterType은 필수입니다.");
    }

    try {
      const rawData = await fetchDoubleRemainHeatmapApi(firstClusterType, secondClusterType);
      return {
        firstContent: rawData.firstContent,
        firstColumnLabels: rawData.firstColumnLabels,
        firstDataRows: rawData.firstDataRows,
        secondContent: rawData.secondContent,
        secondColumnLabels: rawData.secondColumnLabels,
        secondDataRows: rawData.secondDataRows
      };
    } catch (error) {
      console.error("❗ Double 히트맵 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }

  // MARK: - Double 유저 데이터
  async fetchDoubleUserDataSearchResult(
    firstClusterType: string,
    secondClusterType: string,
    fields: string[]
  ): Promise<{
    firstTableData: CohortDoubleUserResponse[];
    secondTableData: CohortDoubleUserResponse[];
  }> {
    if (!firstClusterType || !secondClusterType || !fields || fields.length === 0) {
      throw new Error("유효하지 않은 매개변수: firstClusterType, secondClusterType, fields는 필수입니다.");
    }

    try {
      const rawData = await fetchDoubleUserDataSearchResultApi(firstClusterType, secondClusterType, fields);
      return {
        firstTableData: rawData.firstTableData as CohortDoubleUserResponse[],
        secondTableData: rawData.secondTableData as CohortDoubleUserResponse[],
      };
    } catch (error) {
      console.error("❗ Double 유저 데이터 검색 중 오류 발생:", error);
      throw error;
    }
  }
}