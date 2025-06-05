// src/utils/csvParser.ts

import { ChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";

interface HeatmapCell {
  row: string;
  col: string;
  value: string;
}

interface CohortResult {
  heatmap: HeatmapCell[];
  doughnutChart: ChartData<"doughnut", number[]> | null;
  lineChart: ChartData<"line", number[]> | null;
  insight: string;
  userData: CohortSingleUserResponse[];
}

/**
 * CSV 문자열을 분석 결과 형태로 변환
 */
export function parseCsvToCohortResult(csv: string): CohortResult {
  const rows = csv.trim().split("\n").map((row) => row.split(","));

  // 예시: 첫 줄은 날짜(또는 라벨), 이후 각 셀은 숫자
  const heatmap: HeatmapCell[] = [];

  const header = rows[0].slice(1); // 첫 번째 열은 행 이름, 이후는 열 라벨
  for (let i = 1; i < rows.length; i++) {
    const rowLabel = rows[i][0];
    for (let j = 1; j < rows[i].length; j++) {
      heatmap.push({
        row: rowLabel,
        col: header[j - 1],
        value: rows[i][j],
      });
    }
  }

  // 샘플 데이터 기반 단순 변환 (실제는 서버 CSV 포맷에 따라 커스터마이징 필요)
  const doughnutChart: ChartData<"doughnut", number[]> = {
    labels: ["잔존", "이탈"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const lineChart: ChartData<"line", number[]> = {
    labels: header,
    datasets: [
      {
        label: "잔존율",
        data: header.map(() => Math.random() * 100),
        borderColor: "#2196F3",
        tension: 0.4,
      },
    ],
  };

  const insight = "분석된 데이터를 기반으로 한 인사이트입니다.";

  return {
    heatmap,
    doughnutChart,
    lineChart,
    insight,
    userData: [], // 필요 시 CSV 확장하여 유저 정보도 포함 가능
  };
}
