import { Line } from "react-chartjs-2";
import { ChartData as ChartJSData } from "chart.js";
// import { ChartData } from "@/core/model/ChartData";

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
                    title: { display: true, text: "최근 1년 월별 증감률 그래프" },
                    annotation: {
                        annotations: {
                            zeroLine: {
                            type: 'line',
                            yMin: 0,
                            yMax: 0,
                            borderColor: 'red',
                            borderWidth: 2,
                            borderDash: [6, 6], // ← 점선 스타일
                            label: {
                                display: true,
                                position: 'start',
                                backgroundColor: 'red',
                                color: 'white',
                                },
                            },
                        },
                    },
                    datalabels: {
                        display: false, // 꺾은선 차트 레이블 숨김
                    },
                }
            }}
        />
    );
};