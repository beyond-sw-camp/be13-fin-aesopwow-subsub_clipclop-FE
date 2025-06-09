// // 📁 /src/infrastructure/repositories/ShapRepository.ts
// import Papa from "papaparse";
// import {
//   fetchEntireShapCsvApi,
//   fetchFilteredShapCsvApi,
// } from "@/infrastructure/api/shapApi";

// interface ShapDotRow {
//   feature: string;
//   shapValue: string;
//   colorValue: string;
// }

// interface ShapRow {
//   feature: string;
//   value: number;
// }

// interface SummaryRow {
//   positive: string;
//   특징: string;
//   패턴: string;
//   추천액션: string;
// }

// export interface ShapResult {
//   shapDotChart: ShapDotRow[];
//   barChart: ShapRow[];
//   summary: SummaryRow;
// }

// export class ShapRepository {
//   async fetchEntireShapParsed(): Promise<ShapResult> {
//     const csvText = await fetchEntireShapCsvApi();
//     return this.parse(csvText);
//   }

//   async fetchFilteredShapParsed(keyword: string, filters: any): Promise<ShapResult> {
//     const csvText = await fetchFilteredShapCsvApi(keyword, filters);
//     return this.parse(csvText);
//   }

//   private parse(csvText: string): ShapResult {
//     const blocks = csvText.split(/\n\s*\n/); // 빈 줄 기준 분할

//     const [dotChartBlock, barChartBlock, summaryBlock] = blocks;

//     // 1. SHAP 산점도 데이터 (dot plot)
//     let shapDotChart: ShapDotRow[] = [];
//     if (dotChartBlock?.includes("feature,shapValue,colorValue")) {
//       const parsed = Papa.parse(dotChartBlock.trim(), { header: true });
//       shapDotChart = parsed.data as ShapDotRow[];
//     }

//     // 2. 막대그래프
//     let barChart: ShapRow[] = [];
//     if (barChartBlock?.includes("feature,value")) {
//       const parsed = Papa.parse(barChartBlock.trim(), { header: true });
//       barChart = parsed.data as ShapRow[];
//     }

//     // 3. 분석 요약
//     let summary: SummaryRow = { positive: "", 특징: "", 패턴: "", 추천액션: "" };
//     const parsedSummary = Papa.parse<SummaryRow>(summaryBlock?.trim() || "", { header: true });
//     if (parsedSummary?.data?.[0]) {
//       summary = parsedSummary.data[0];
//     }

//     return { shapDotChart, barChart, summary };
//   }
// }