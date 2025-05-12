// /src/infrastructure/repositories/CohortRepository.ts
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

import { CustomError } from "@/error/CustomError";
import { ErrorResponse } from "@/error/ErrorResponse";
import { ErrorCode } from "@/error/ErrorCode";

// MARK: - Repository 통일 에러 관리
export class CohortRepository {
  async fetchSingleVisualization(clusterType: string): Promise<CohortSingleVisualizationResponse> {
    if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

    try {
      const rawData = await fetchSingleVisualizationApi(clusterType);
      return { imageBase64A: rawData.imageBase64A, imageBase64B: rawData.imageBase64B };
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }

  async fetchSingleInsight(clusterType: string): Promise<CohortSingleInsightResponse> {
    if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

    try {
      const rawData = await fetchSingleInsightApi(clusterType);
      return { content: rawData.content };
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }

  async fetchSingleRemainHeatmap(clusterType: string): Promise<CohortSingleHeatmapResponse> {
    if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

    try {
      const rawData = await fetchSingleRemainHeatmapApi(clusterType);
      return { content: rawData.content, columnLabels: rawData.columnLabels, dataRows: rawData.dataRows };
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }

  async fetchSingleUserDataSearchResult(clusterType: string, fields: string[]): Promise<CohortSingleUserResponse[]> {
    if (!clusterType || !fields.length) throw new CustomError(ErrorCode.INVALID_PARAMS);

    try {
      const rawData = await fetchSingleUserDataSearchResultApi(clusterType, fields);
      return (rawData?.tableData ?? []) as CohortSingleUserResponse[];
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }

  async fetchDoubleVisualization(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleVisualizationResponse> {
    if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

    try {
      const rawData = await fetchDoubleVisualizationApi(firstClusterType, secondClusterType);
      return {
        firstImageBase64A: rawData.firstImageBase64A,
        firstImageBase64B: rawData.firstImageBase64B,
        secondImageBase64A: rawData.secondImageBase64A,
        secondImageBase64B: rawData.secondImageBase64B
      };
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }

  async fetchDoubleInsight(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleInsightResponse> {
    if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

    try {
      const rawData = await fetchDoubleInsightApi(firstClusterType, secondClusterType);
      return { firstContent: rawData.firstContent, secondContent: rawData.secondContent };
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }

  async fetchDoubleRemainHeatmap(firstClusterType: string, secondClusterType: string): Promise<CohortDoubleHeatmapResponse> {
    if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

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
      throw new ErrorResponse(error);
    }
  }

  async fetchDoubleUserDataSearchResult(
    firstClusterType: string,
    secondClusterType: string,
    fields: string[]
  ): Promise<{ firstTableData: CohortDoubleUserResponse[]; secondTableData: CohortDoubleUserResponse[] }> {
    if (!firstClusterType || !secondClusterType || !fields.length) throw new CustomError(ErrorCode.INVALID_PARAMS);

    try {
      const rawData = await fetchDoubleUserDataSearchResultApi(firstClusterType, secondClusterType, fields);
      return {
        firstTableData: rawData.firstTableData as CohortDoubleUserResponse[],
        secondTableData: rawData.secondTableData as CohortDoubleUserResponse[]
      };
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }
}