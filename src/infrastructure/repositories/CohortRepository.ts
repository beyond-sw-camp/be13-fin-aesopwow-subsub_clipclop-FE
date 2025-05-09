// /infrastructure/repositories/CohortRepository.ts

import {
  fetchVisualizationApi,
  fetchInsightApi,
  fetchRemainHeatmapApi,
} from "@/infrastructure/api/CohortApi.ts";

import { getUser } from "@/application/stores/UserStore.ts";
import {
  CohortVisualizationResponse,
  CohortInsightResponse,
  CohortHeatmapResponse,
} from "@/core/model/CohortModel";

export class CohortRepository {
  // MARK: - 시각화 조회
  async fetchVisualization(clusterType: string): Promise<CohortVisualizationResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchVisualizationApi(companyNo, clusterType);
    return {
      visualizationImage1Base64: rawData.imageBase64A,
      visualizationImage2Base64: rawData.imageBase64B 
    };
  }

  // MARK: - 인사이트 조회
  async fetchInsight(clusterType: string): Promise<CohortInsightResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchInsightApi(companyNo, clusterType);
    return {
      content: rawData.content,
    };
  }

  // MARK: - 잔존율 히트맵 조회
  async fetchRemainHeatmap(clusterType: string): Promise<CohortHeatmapResponse> {
    const { companyNo } = getUser();
    const rawData = await fetchRemainHeatmapApi(companyNo, clusterType);
    return {
      content: rawData.content,
      columnLabels: rawData.columnLabels,
      dataRows: rawData.dataRows,
    };
  }
}