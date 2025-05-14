import { BoardGrid } from "@/presentation/components/molecules/BoardGrid";
import { LineChart } from "@/presentation/components/atoms/LineChart";
import { DoughnutChart } from "@/presentation/components/atoms/DoughnutChart";
import { StackedBarChart } from "@/presentation/components/atoms/StackedBarChart";
import UserIcon from "@/assets/icons/user.svg?react";
import "./DashBoardContent.css";

const boardData = [
    { title: "총 구독자 수", number: 1050, icon: UserIcon },
    { title: "신규 유저", number: 2300, icon: UserIcon },
    { title: "증감율", number: 20.2, icon: UserIcon },
    { title: "해지율", number: 120, icon: UserIcon },
    { title: "활성 유저", number: 35, icon: UserIcon },
    { title: "휴면 유저", number: 88, icon: UserIcon },
];

export const DashBoardContent = () => (
    <div className="dashboard-vertical">
        {/* 상단: 스탯카드 + 꺾은선 */}
        <div className="dashboard-row">
            <div>
                <BoardGrid boards={boardData} />
            </div>
            <div className="dashboard-linechart">
                <LineChart />
            </div>
        </div>
        {/* 하단: 도넛차트 + 스택바 */}
        <div className="dashboard-row">
            <div className="dashboard-doughnut">
                <DoughnutChart />
            </div>
            <div className="dashboard-stackedbar">
                <StackedBarChart />
            </div>
        </div>
    </div>
);