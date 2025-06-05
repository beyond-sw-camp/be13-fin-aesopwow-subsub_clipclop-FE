import { ChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  DoughnutController
);

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
  groupData: Record<string, number[]>;
}

export function parseCsvToCohortResult(csv: string): CohortResult {
  const rows = csv.trim().split("\n").map((row) => row.split(","));
  const headerRow = rows[0];
  const groupLabels = headerRow.slice(1);

  const heatmap: HeatmapCell[] = [];
  const groupData: Record<string, number[]> = {};
  const rawData: { month: number; values: string[] }[] = [];

  groupLabels.forEach((label) => {
    groupData[label] = [];
  });

  for (let i = 1; i < rows.length; i++) {
    const [month, ...values] = rows[i];
    rawData.push({
      month: Number(month),
      values,
    });
  }

  rawData.sort((a, b) => a.month - b.month);
  const months = rawData.map((entry) => entry.month.toString());

  for (const { month, values } of rawData) {
    for (let j = 0; j < values.length; j++) {
      const group = groupLabels[j];
      const value = parseFloat(values[j]) || 0;
      groupData[group].push(value);

      heatmap.push({
        row: group,
        col: month.toString(),
        value: values[j],
      });
    }
  }

  const colors = ["#2196F3", "#4CAF50", "#FF9800"];
  const lineChart: ChartData<"line", number[]> = {
    labels: months,
    datasets: groupLabels.map((label, idx) => ({
      label,
      data: groupData[label],
      borderColor: colors[idx],
      tension: 0.4,
    })),
  };

  // 마지막 유효 월 기준 도넛 차트 계산
  let lastValidIndex = -1;
  const referenceGroup = groupData["P 그룹 잔여율"];

  if (referenceGroup) {
    for (let i = referenceGroup.length - 1; i >= 0; i--) {
      if (referenceGroup[i] > 0) {
        lastValidIndex = i;
        break;
      }
    }
  }

  const lastValue = referenceGroup?.[lastValidIndex] ?? 0;

  const doughnutChart: ChartData<"doughnut", number[]> = {
    labels: ["잔존", "이탈"],
    datasets: [
      {
        data: [lastValue, 100 - lastValue],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const insight = "각 그룹의 잔존율을 기반으로 월별 사용자 유지 현황을 확인할 수 있습니다.";

  return {
    heatmap,
    doughnutChart,
    lineChart,
    insight,
    userData: [],
    groupData,
  };
}
