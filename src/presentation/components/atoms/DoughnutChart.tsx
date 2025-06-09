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
                    title: { display: true, text: "신규 유저 구독 유형" }
                }
            }}
        />
    );
};