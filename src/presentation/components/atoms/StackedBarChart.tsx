import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";

interface ChartProps {
    chartData: ChartData | null;
}

export const StackedBarChart: React.FC<ChartProps> = ({ chartData }) => {
    if (!chartData) return <div>데이터가 없습니다.</div>;

    return (
        <Bar
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "스택 바 차트" }
                },
                scales: {
                    x: { stacked: true },
                    y: { stacked: true }
                }
            }}
        />
    );
};