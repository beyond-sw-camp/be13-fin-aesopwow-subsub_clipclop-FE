import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const lineData = {
    labels: ["January", "February", "March"],
    datasets: [
        {
            label: "꺾은선 데이터",
            data: [65, 59, 80],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
        },
    ],
};

const lineOptions = {
    responsive: true,
    plugins: {
        legend: { position: "top" as const },
        title: { display: true, text: "꺾은선 그래프 예시" },
    },
};

export function LineChart() {
    return <Line data={lineData} options={lineOptions} />;
}