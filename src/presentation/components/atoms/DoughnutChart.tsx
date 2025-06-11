import { Doughnut } from "react-chartjs-2";
import { ChartData } from '@/core/model/ChartData';

interface ChartProps {
    chartData: ChartData | null;
}

export const DoughnutChart: React.FC<ChartProps> = ({ chartData }) => {
    if (!chartData) return <div>데이터가 없습니다.</div>;

    return (
        <Doughnut
            data={chartData}
            options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: "top" },
                    title: { display: true, text: "신규 유저 구독 유형" },
                    datalabels: {
                        formatter: (value, context) => {
                            const data = context.chart.data.datasets[0].data;
                            const total = (data as number[]).reduce((acc, val) => acc + val, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${percentage}%`;
                        },
                        color: '#fff',
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                    },
                }
            }}
        />
    );
};