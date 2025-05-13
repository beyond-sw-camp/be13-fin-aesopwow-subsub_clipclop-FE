export interface ChartData {
    labels: string[];
    datasets: ChartDataPoint[];
}

export interface ChartDataPoint {
    label: string;
    data: number[];
    backgroundColor: string[];
}