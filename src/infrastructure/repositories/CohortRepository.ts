import Papa from "papaparse";
import { fetchCohortCsvApi } from "@/infrastructure/api/CohortApi";
import { ChartData as DoughnutChartData, ChartData as LineChartData } from "chart.js";
import { CohortSingleUserResponse } from "@/core/model/CohortModel";

import { postCohortAnalysis, getCohortFileList, getCohortResultCsv } from "../api/CohortApi";
import { CohortRequestDto, CohortFileInfo } from "@/core/model/CohortModels";

interface HeatmapCell {
  row: string;
  col: string;
  value: string;
}

interface SubscriptionTypeRow {
  month: string;
  type: string;
  "basic(%)": string;
  "standard(%)": string;
  "premium(%)": string;
}

interface IncreaseRateRow {
  month: string;
  subscribers: string;
  "rate(%)": string;
}

interface InsightRow {
  content: string;
}

export class CohortRepository {
  // 분석 요청
  async requestCohort(dto: CohortRequestDto): Promise<void> {
    await postCohortAnalysis(dto);
  }

  // 분석 리스트
  async getCohortHistory(infoDbNo: number, analysisNo: number): Promise<CohortFileInfo[]> {
    return await getCohortFileList(infoDbNo, analysisNo);
  }

  // 분석 결과
  async fetch(infoDbNo: number, analysisNo: number, filename: string): Promise<string> {
    return await getCohortResultCsv({ infoDbNo, analysisNo, filename });
  }


  async fetchCohortCsvParsed(
    cluster:
      | { clusterType: string } // 단일 분석
      | { firstClusterType: string; secondClusterType: string } // 이중 분석
  ): Promise<
    {
      heatmap: HeatmapCell[];
      doughnutChart: DoughnutChartData;
      lineChart: LineChartData<"line", number[]>;
      insight: string;
      userData: CohortSingleUserResponse[];
    }[]
  > {
    const csvText = await fetchCohortCsvApi(cluster);
    const blocks = csvText.split(/\n\s*\n/); // 빈 줄 기준으로 분할

    const result: {
      heatmap: HeatmapCell[];
      doughnutChart: DoughnutChartData;
      lineChart: LineChartData<"line", number[]>;
      insight: string;
      userData: CohortSingleUserResponse[];
    }[] = [];

    for (let i = 0; i < blocks.length; i += 5) {
      const [heatmapBlock, donutBlock, lineBlock, insightBlock, userBlock] = blocks.slice(i, i + 5);

      // 1. Heatmap
      let heatmap: HeatmapCell[] = [];
      if (heatmapBlock?.includes("row,col,value")) {
        const parsed = Papa.parse(heatmapBlock.trim(), { header: true });
        heatmap = parsed.data as HeatmapCell[];
      }

      // 2. Doughnut
      let doughnutChart: DoughnutChartData = { labels: [], datasets: [] };
      if (donutBlock?.includes("month,type")) {
        const parsed = Papa.parse(donutBlock.trim(), { header: true });
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        const targetMonth = monthAgo.toISOString().slice(0, 7);

        const targetRow = (parsed.data as SubscriptionTypeRow[]).find(
          (row) => row.month === targetMonth && row.type === "new"
        );

        if (targetRow) {
          doughnutChart = {
            labels: ["Basic", "Standard", "Premium"],
            datasets: [
              {
                label: `${targetMonth} 신규 유저 비율`,
                data: [
                  parseFloat(targetRow["basic(%)"]),
                  parseFloat(targetRow["standard(%)"]),
                  parseFloat(targetRow["premium(%)"]),
                ],
                backgroundColor: ["#60A5FA", "#A78BFA", "#34D399"],
              },
            ],
          };
        }
      }

      // 3. Line Chart
      let lineChart: LineChartData<"line", number[]> = { labels: [], datasets: [] };
      if (lineBlock?.includes("rate(%)")) {
        const parsed = Papa.parse(lineBlock.trim(), { header: true });
        const rows = parsed.data as IncreaseRateRow[];
        lineChart = {
          labels: rows.map((r) => r.month),
          datasets: [
            {
              label: "구독 증감률(%)",
              data: rows.map((r) => parseFloat(r["rate(%)"])),
              borderColor: "#4F46E5",
              backgroundColor: "#C7D2FE",
              tension: 0.3,
            },
          ],
        };
      }

      // 4. Insight
      const parsedInsight = Papa.parse<InsightRow>(insightBlock?.trim() || "", { header: true });
      const insight = parsedInsight.data?.[0]?.content || "";

      // 5. User Data
      let userData: CohortSingleUserResponse[] = [];
      if (userBlock?.includes("userId")) {
        const parsedUser = Papa.parse(userBlock.trim(), { header: true });
        userData = parsedUser.data as CohortSingleUserResponse[];
      }

      result.push({ heatmap, doughnutChart, lineChart, insight, userData });
    }

    return result;
  }
}
