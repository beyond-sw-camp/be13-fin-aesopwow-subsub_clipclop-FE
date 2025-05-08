// /core/model/CohortModel.ts

// MARK: - 행동 패턴 타입
export interface CohortBehaviorPatternResponse {
    title: string;
    content: string;
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
    heatmapImageBase64: string;
}
