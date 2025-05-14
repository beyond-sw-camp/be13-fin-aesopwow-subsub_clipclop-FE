import { Line } from "react-chartjs-2";
import { ChartData as ChartJSData } from "chart.js";
import { ChartData } from "@/core/model/ChartData";

interface ChartProps {
    chartData: ChartJSData<'line', number[]> | null;
}

export const LineChart: React.FC<ChartProps> = ({ chartData }) => {
    if (!chartData) return <div>데이터가 없습니다.</div>;

    return (
        <Line
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "꺾은선 그래프" }
                }
            }}
        />
    );
};