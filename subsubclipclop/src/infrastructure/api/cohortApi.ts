// // /infrastructure/api/cohortApi.ts

// // 행동 패턴 API
// export async function fetchBehaviorPatternApi() {
//   return fetch("/api/cohorts/behavior-pattern").then(res => res.json());
// }

// // 잔존율 히트맵 API
// export async function fetchRemainHeatmapApi() {
//   return fetch("/api/cohorts/remain-heatmap").then(res => res.json());
// }

// // 인사이트 API
// export async function fetchInsightApi() {
//   return fetch("/api/cohorts/insight").then(res => res.json());
// }

// /infrastructure/api/cohortApi.ts

// 행동 패턴 API
export async function fetchBehaviorPatternApi() {
  return fetch("/mock/behavior-pattern.json").then(res => res.json());
}

// 잔존율 히트맵 API
export async function fetchRemainHeatmapApi() {
  return fetch("/mock/remain-heatmap.json").then(res => res.json());
}

// 인사이트 API
export async function fetchInsightApi() {
  return fetch("/mock/insight.json").then(res => res.json());
}
