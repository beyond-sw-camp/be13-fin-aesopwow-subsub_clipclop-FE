export async function fetchCohortDataApi() {
    // API 호출 예시
    return fetch("/api/cohorts").then(res => res.json());
  }
  
  export async function fetchRetentionHeatmapApi() {
    return fetch("/api/retention").then(res => res.json());
  }