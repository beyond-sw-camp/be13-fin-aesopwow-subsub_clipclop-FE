// /core/model/CohortModel.ts

// MARK: - 시각화 타입
export interface CohortVisualizationResponse {
  visualizationImage1Base64: string;
  visualizationImage2Base64: string;
}

// MARK: - 인사이트 타입
export interface CohortInsightResponse {
  content: string;
}

// MARK: - 잔존율 히트맵 타입
export interface CohortHeatmapResponse {
  content: string;
  columnLabels: string[];
  dataRows: string[][];
}