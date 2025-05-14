import { BoardGrid } from "@/presentation/components/molecules/BoardGrid";
import { LineChart } from "@/presentation/components/atoms/LineChart";
import { DoughnutChart } from "@/presentation/components/atoms/DoughnutChart";
import { StackedBarChart } from "@/presentation/components/atoms/StackedBarChart";
import { ChartData, StatCardData } from "@/application/stores/DashBoardStore";
import "./DashBoardContent.css";

interface DashBoardContentProps {
    cards: StatCardData[];
    chartData: ChartData | null;
}

export const DashBoardContent = ({
    cards,
    chartData
}: DashBoardContentProps) => {
    return (
        <div className="dashboard-vertical">
            <div className="dashboard-row">
                <div>
                    <BoardGrid cards={cards} />
                </div>
                <div className="dashboard-linechart">
                    <LineChart chartData={chartData} />
                </div>
            </div>
            <div className="dashboard-row">
                <div className="dashboard-doughnut">
                    <DoughnutChart chartData={chartData} />
                </div>
                <div className="dashboard-stackedbar">
                    <StackedBarChart chartData={chartData} />
                </div>
            </div>
        </div>
    );
};