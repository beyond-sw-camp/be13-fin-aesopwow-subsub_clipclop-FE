// // /infrastructure/api/cohortApi.ts

// 행동 패턴 API
export async function fetchBehaviorPatternApi(companyNo: number) {
  return fetch("/api/cohorts/behavior-pattern", {
    method: "POST", // ✅ POST 방식
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ companyNo }) // ✅ 요청 바디에 JSON 전달
  })
    .then(res => {
      console.log("응답 상태:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("받은 데이터:", data);
      return data;
    })
    .catch(err => {
        console.error("API 요청 에러:", err);
        throw err; // 오류를 호출자에게 전파
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

// 잔존율 히트맵 API
export async function fetchRemainHeatmapApi() {
  return fetch("/mock/remain-heatmap.json").then(res => res.json());
}

// 인사이트 API
export async function fetchInsightApi() {
  return fetch("/mock/insight.json").then(res => res.json());
}
