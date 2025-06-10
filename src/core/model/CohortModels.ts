// src/core/model/CohortModels.ts

export interface CohortRequestDto {
  infoDbNo: number;
  analysisNo: number;
  targetTableUser: string;
  targetTableSub: string;
  targetDate: string;
  filename: string;
}

export interface CohortFileInfo {
  key: string;
  lastModified: string;
  size: number;
}

export interface Insight {
  summary: string;
  recommendations: string[];
  prediction: string;
}