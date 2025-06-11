import { Bar } from "react-chartjs-2";
import { ChartData as ChartJSData } from "chart.js";
// import { ChartData as AppChartData } from "@/core/model/ChartData";

interface ChartProps {
    chartData: ChartJSData<'bar'> | null;
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
                title: { display: true, text: "최근 1년 월별 유저 구독 유형" },
                datalabels: {
                    display: false, // 꺾은선 차트 레이블 숨김
                },
            },
            layout: {
            padding: {
                bottom: 30,
            },
            },
            scales: {
                x: {
                type: 'category',
                stacked: true,
                ticks: {
                    autoSkip: false,
                    maxRotation: 45,
                    minRotation: 45,
                },
                grid: {
                    drawOnChartArea: false,
                },
                border: {
                    display: false,
                },
                },
                y: {
                    stacked: true,
                    max: 100,
                    ticks: {
                    callback: (value) => `${value}%`,
                    },
                    grid: {
                    color: (ctx) =>
                        ctx.tick.value === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)',
                    },
                    border: {
                    display: false,
                    },
                },
            }
        }}
        />
    );
};