import { BoardGrid } from "@/presentation/components/molecules/BoardGrid";
import LineChart from "@/presentation/components/atoms/LineChart";
import DoughnutChart from "@/presentation/components/atoms/DoughnutChart";
import StackedBarChart from "@/presentation/components/atoms/StackedBarChart";
import { ReactComponent as UserIcon } from "@/assets/icons/user.svg";
import "./DashboardSection.css";

const boardData = [
    { title: "총 구독자 수", number: 1050, icon: UserIcon },
    { title: "신규 유저", number: 2300, icon: UserIcon },
    { title: "증감율", number: 20.2, icon: UserIcon },
    { title: "해지율", number: 120, icon: UserIcon },
    { title: "활성 유저", number: 35, icon: UserIcon },
    { title: "휴면 유저", number: 88, icon: UserIcon },
];

const DashboardSection = () => (
    <div className="dashboard-grid">
        <div className="dashboard-boardgrid">
            <BoardGrid boards={boardData} />
        </div>
        <div className="dashboard-charts">
            <div className="dashboard-linechart">
                <LineChart />
            </div>
            <div className="dashboard-doughnut">
                <DoughnutChart />
            </div>
            <div className="dashboard-stackedbar">
                <StackedBarChart />
            </div>
        </div>
    </div>
);

export default DashboardSection;