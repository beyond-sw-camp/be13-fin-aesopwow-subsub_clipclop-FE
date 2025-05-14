import React from "react";
import { BoardGrid } from "@/presentation/components/molecules/BoardGrid";
import { LineChart } from "@/presentation/components/atoms/LineChart";
import { DoughnutChart } from "@/presentation/components/atoms/DoughnutChart";
import { StackedBarChart } from "@/presentation/components/atoms/StackedBarChart";
import "./DashBoardContent.css";

// props 타입 정의
interface DashBoardContentProps {
    cards: any[]; // StatCardData[]
    chartData: any; // ChartData | null
}

export const DashBoardContent = ({ cards, chartData }: DashBoardContentProps) => {
    return (
        <div className="dashboard-vertical">
            <div className="dashboard-row">
                <div>
                    <BoardGrid cards={cards} />
                </div>
                <div className="dashboard-linechart">
                    <LineChart data={chartData} />
                </div>
            </div>
            <div className="dashboard-row">
                <div className="dashboard-doughnut">
                    <DoughnutChart data={chartData} />
                </div>
                <div className="dashboard-stackedbar">
                    <StackedBarChart data={chartData} />
                </div>
            </div>
        </div>
    );
};