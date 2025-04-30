import axiosInstance from "@/infrastructure/api/axios"; // axios 인스턴스를 import
import { CohortAnalysisBehaviorPatternRequestDto } from "@/core/cohort/CohortAnalysisBehaviorPatternRequestDto";
import { CohortAnalysisInsightRequestDto } from "@/core/cohort/CohortAnalysisInsightRequestDto";
import { CohortAnalysisRemainHeatmapRequestDto } from "@/core/cohort/CohortAnalysisRemainHeatmapRequestDto";

// ✅ 행동 패턴 API
export async function fetchBehaviorPatternApi(dto: CohortAnalysisBehaviorPatternRequestDto) {
  try {
    const res = await axiosInstance.post("/cohorts/behavior-pattern", dto);
    return res.data;
  } catch (err) {
    console.error("BehaviorPattern API 요청 에러:", err);
    throw err;
  }
}

// ✅ 인사이트 API
export async function fetchInsightApi(dto: CohortAnalysisInsightRequestDto) {
  try {
    const res = await axiosInstance.post("/cohorts/insight", dto);
    return res.data;
  } catch (err) {
    console.error("Insight API 요청 에러:", err);
    throw err;
  }
}

// ✅ 리텐션 히트맵 API
export async function fetchRemainHeatmapApi(dto: CohortAnalysisRemainHeatmapRequestDto) {
  try {
    const res = await axiosInstance.post("/cohorts/remain-heatmap", dto);
    return res.data;
  } catch (err) {
    console.error("RemainHeatmap API 요청 에러:", err);
    throw err;
  }
}
