// /core/model/CohortModel.ts

// MARK: - Single 시각화 응답
export interface CohortSingleVisualizationResponse {
  imageBase64A: string;
  imageBase64B: string;
}

// MARK: - Single 인사이트 응답
export interface CohortSingleInsightResponse {
  content: string;
}

// MARK: - Single 히트맵 응답
export interface CohortSingleHeatmapResponse {
  content: string;
  columnLabels: string[];
  dataRows: string[][];
}

// MARK: - Single 유저 데이터
export interface CohortSingleUserResponse {
  userId: number;
  name: string;
  age: number;
  country: string;
  subscription: "Basic" | "Premium" | "Ultimate";
  watchTimeHours: number;
  favoriteGenre: string;
  lastLogin: string;
}

// MARK: - Double 시각화
export interface CohortDoubleVisualizationResponse {
  firstImageBase64A: string;
  firstImageBase64B: string;
  secondImageBase64A: string;
  secondImageBase64B: string;
}

// MARK: - Double 인사이트
export interface CohortDoubleInsightResponse {
  firstContent: string;
  secondContent: string;
}

// MARK: - Double 히트맵
export interface CohortDoubleHeatmapResponse {
  firstContent: string;
  firstColumnLabels: string[];
  firstDataRows: string[][];
  secondContent: string;
  secondColumnLabels: string[];
  secondDataRows: string[][];
}

// MARK: - Double 유저 데이터 응답 모델
export interface CohortDoubleUserResponse {
  userId: number;
  name: string;
  age: number;
  country: string;
  subscription: "Basic" | "Premium" | "Ultimate";
  watchTimeHours: number;
  favoriteGenre: string;
  lastLogin: string;
}