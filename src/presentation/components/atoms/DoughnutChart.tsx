import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutData = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
        {
            label: "도넛 데이터",
            data: [12, 19, 3],
            backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(27, 96, 200, 0.56)",
                "rgba(244, 240, 8, 0.39)",
            ],
            borderWidth: 1,
        },
    ],
};

const doughnutOptions = {
    responsive: true,
    plugins: {
        legend: { position: "top" as const },
        title: { display: true, text: "도넛 차트 예시" },
    },
};

export function DoughnutChart() {
    return <Doughnut data={doughnutData} options={doughnutOptions} />;
}