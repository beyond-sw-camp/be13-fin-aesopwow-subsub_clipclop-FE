import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const stackedBarData = {
    labels: ["January", "February", "March"],
    datasets: [
        {
            label: "Dataset 1",
            data: [30, 20, 50],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
            label: "Dataset 2",
            data: [20, 30, 40],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
        },
    ],
};

const stackedBarOptions = {
    responsive: true,
    plugins: {
        legend: { position: "top" as const },
        title: { display: true, text: "스택 바 차트 예시" },
    },
    scales: {
        x: { stacked: true },
        y: { stacked: true },
    },
};

export default function LineChart() {
  return <Bar data={stackedBarData} options={stackedBarOptions} />;
}