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

import { getUser } from "@/application/stores/UserStore.ts";
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
    const { companyNo } = getUser();
    const rawData = await fetchSingleVisualizationApi(companyNo, clusterType);
    return {
      imageBase64A: rawData.imageBase64A,
      imageBase64B: rawData.imageBase64B
    };
  }

  // MARK: - Single 인사이트
  async fetchSingleInsight(clusterType: string): Promise<CohortSingleInsightResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchSingleInsightApi(companyNo, clusterType);
    return {
      content: rawData.content,
    };
  }

  // MARK: - Single 히트맵
  async fetchSingleRemainHeatmap(clusterType: string): Promise<CohortSingleHeatmapResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchSingleRemainHeatmapApi(companyNo, clusterType);
    return {
      content: rawData.content,
      columnLabels: rawData.columnLabels,
      dataRows: rawData.dataRows,
    };
  }

  // MARK: - Single 유저 데이터
  async fetchSingleUserDataSearchResult(clusterType: string, fields: string[]): Promise<CohortSingleUserResponse[]> {
    const rawData = await fetchSingleUserDataSearchResultApi(clusterType, fields);
    return rawData.tableData as CohortSingleUserResponse[];
  }

  // MARK: - Double 시각화
  async fetchDoubleVisualization(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleVisualizationResponse> {
    const rawData = await fetchDoubleVisualizationApi(firstClusterType, secondClusterType);
    return {
      firstImageBase64A: rawData.firstImageBase64A,
      firstImageBase64B: rawData.firstImageBase64B,
      secondImageBase64A: rawData.secondImageBase64A,
      secondImageBase64B: rawData.secondImageBase64B
    };
  }

  // MARK: - Double 인사이트
  async fetchDoubleInsight(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleInsightResponse> {
    const rawData = await fetchDoubleInsightApi(firstClusterType, secondClusterType);
    return {
      firstContent: rawData.firstContent,
      secondContent: rawData.secondContent
    };
  }

  // MARK: - Double 히트맵
  async fetchDoubleRemainHeatmap(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleHeatmapResponse> {
    const rawData = await fetchDoubleRemainHeatmapApi(firstClusterType, secondClusterType);
    return {
      firstContent: rawData.firstContent,
      firstColumnLabels: rawData.firstColumnLabels,
      firstDataRows: rawData.firstDataRows,
      secondContent: rawData.secondContent,
      secondColumnLabels: rawData.secondColumnLabels,
      secondDataRows: rawData.secondDataRows
    };
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
    const rawData = await fetchDoubleUserDataSearchResultApi(firstClusterType, secondClusterType, fields);
    return {
      firstTableData: rawData.firstTableData as CohortDoubleUserResponse[],
      secondTableData: rawData.secondTableData as CohortDoubleUserResponse[],
    };
  }

}