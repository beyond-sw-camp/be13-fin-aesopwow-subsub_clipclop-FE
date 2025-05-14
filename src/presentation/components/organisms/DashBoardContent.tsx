import { BoardGrid } from "@/presentation/components/molecules/BoardGrid";
import { LineChart } from "@/presentation/components/atoms/LineChart";
import { DoughnutChart } from "@/presentation/components/atoms/DoughnutChart";
import { StackedBarChart } from "@/presentation/components/atoms/StackedBarChart";
import { StatCardData } from "@/application/stores/DashBoardStore";
import { ChartData } from "@/core/model/ChartData";

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
                    {chartData ? (
                        <LineChart chartData={chartData} />
                    ) : (
                        <div className="chart-loading">데이터를 불러오는 중입니다...</div>
                    )}
                </div>
            </div>
            <div className="dashboard-row">
                <div className="dashboard-doughnut">
                    {chartData ? (
                        <DoughnutChart chartData={chartData} />
                    ) : (
                        <div className="chart-loading">데이터를 불러오는 중입니다...</div>
                    )}
                </div>
                <div className="dashboard-stackedbar">
                    {chartData ? (
                        <StackedBarChart chartData={chartData} />
                    ) : (
                        <div className="chart-loading">데이터를 불러오는 중입니다...</div>
                    )}
                </div>
            </div>
        </div>
    );
};