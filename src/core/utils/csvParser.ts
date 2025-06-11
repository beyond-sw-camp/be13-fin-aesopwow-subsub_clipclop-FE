import { ChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";
import annotationPlugin from 'chartjs-plugin-annotation';

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
  DoughnutController,
  annotationPlugin
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
  userData: CohortSingleUserResponse[];
  groupData: Record<string, number[]>;
}

export function parseCsvToCohortResult(csv: string): CohortResult {
  if (!csv.trim()) {
    throw new Error("CSV 데이터가 비어있습니다.");
  }

  const rows = csv.trim().split("\n").map((row) => row.split(","));

  if (rows.length < 2) {
    throw new Error("CSV 데이터가 유효하지 않습니다. 최소 헤더와 1개 이상의 데이터 행이 필요합니다.");
  }

  const headerRow = rows[0];
  const groupLabels = headerRow.slice(1);

  if (groupLabels.length === 0) {
    throw new Error("CSV 헤더에 그룹 이름이 포함되어야 합니다.");
  }

  const heatmap: HeatmapCell[] = [];
  const groupData: Record<string, number[]> = {};
  const rawData: { month: number; values: string[] }[] = [];

  groupLabels.forEach((label) => {
    groupData[label] = [];
  });

  for (let i = 1; i < rows.length; i++) {
    const [monthStr, ...values] = rows[i];

    const month = Number(monthStr);
    if (isNaN(month)) {
      // console.warn(`무시된 행: 잘못된 월 값 '${monthStr}'`);
      continue;
    }

    rawData.push({ month, values });
  }

  rawData.sort((a, b) => a.month - b.month);
  const months = rawData.map((entry) => entry.month.toString());

  for (const { month, values } of rawData) {
    for (let j = 0; j < values.length; j++) {
      const group = groupLabels[j];
      const rawValue = values[j];
      const value = parseFloat(rawValue) || 0;

      groupData[group].push(value);

      heatmap.push({
        row: group,
        col: month.toString(),
        value: rawValue,
      });
    }
  }

  const colors = ["#2196F3", "#4CAF50", "#FF9800"];
  const lineChart: ChartData<"line", number[]> = {
    labels: months,
    datasets: groupLabels.map((label, idx) => ({
      label,
      data: groupData[label],
      borderColor: colors[idx % colors.length],
      tension: 0.4,
    })),
  };

  // 마지막 유효 월 기준 도넛 차트 계산
  let lastValidIndex = -1;
  const referenceGroup = groupData[groupLabels[0]] || groupData["P 그룹 잔여율"];

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

  return {
    heatmap,
    doughnutChart,
    lineChart,
    userData: [],
    groupData,
  };
}