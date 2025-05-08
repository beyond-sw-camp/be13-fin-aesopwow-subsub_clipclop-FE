// /core/model/CohortModel.ts

// MARK: - 시각화 타입
export interface CohortVisualizationResponse {
    title: string;
    visualizationImage1Base64: string;
    visualizationImage2Base64: string;
  }
  

// MARK: - 인사이트 타입
export interface CohortInsightResponse {
    title: string;
    content: string;
}

// MARK: - 잔존율 히트맵 타입
export interface CohortHeatmapResponse {
    title: string;
    content: string;
    columnLabels: string[];
    dataRows: string[][];
  }
