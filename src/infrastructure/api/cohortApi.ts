// /infrastructure/api/cohortApi.ts
import { CohortAnalysisBehaviorPatternRequestDto } from "@/core/cohort/CohortAnalysisBehaviorPatternRequestDto";
import { CohortAnalysisInsightRequestDto } from "@/core/cohort/CohortAnalysisInsightRequestDto";
import { CohortAnalysisRemainHeatmapRequestDto } from "@/core/cohort/CohortAnalysisRemainHeatmapRequestDto.ts";

// ✅ 행동 패턴 API
export async function fetchBehaviorPatternApi(dto: CohortAnalysisBehaviorPatternRequestDto) {
  return fetch("/api/cohorts/behavior-pattern", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  })
    .then(res => res.json())
    .catch(err => {
      console.error("BehaviorPattern API 요청 에러:", err);
      throw err;
    });
}

// ✅ 인사이트 API
export async function fetchInsightApi(dto: CohortAnalysisInsightRequestDto) {
  return fetch("/api/cohorts/insight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  })
    .then(res => res.json())
    .catch(err => {
      console.error("Insight API 요청 에러:", err);
      throw err;
    });
}

// ✅ 리텐션 히트맵 API
export async function fetchRemainHeatmapApi(dto: CohortAnalysisRemainHeatmapRequestDto) {
  return fetch("/api/cohorts/remain-heatmap", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dto)
  })
    .then(res => res.json())
    .catch(err => {
      console.error("RemainHeatmap API 요청 에러:", err);
      throw err;
    });
}





// // 잔존율 히트맵 API
// export async function fetchRemainHeatmapApi() {
//   return fetch("/api/cohorts/remain-heatmap").then(res => res.json());
// }

// // 인사이트 API
// export async function fetchInsightApi() {
//   return fetch("/api/cohorts/insight").then(res => res.json());
// }

// /infrastructure/api/cohortApi.ts

// // 행동 패턴 API
// export async function fetchBehaviorPatternApi() {
//   return fetch("/mock/behavior-pattern.json").then(res => res.json());
// }

// // 잔존율 히트맵 API
// export async function fetchRemainHeatmapApi() {
//   return fetch("/mock/remain-heatmap.json").then(res => res.json());
// }

// // 인사이트 API
// export async function fetchInsightApi() {
//   return fetch("/mock/insight.json").then(res => res.json());
// }
