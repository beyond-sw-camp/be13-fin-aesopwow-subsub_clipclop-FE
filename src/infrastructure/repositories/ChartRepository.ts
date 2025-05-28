import { ChartData } from "@/core/model/ChartData";

export interface ChartDataRepository {
    getChartData(csvData: string): Promise<ChartData>;
}