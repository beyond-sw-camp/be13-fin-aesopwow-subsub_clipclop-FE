import { PageBreadcrumb } from "../components/molecules/PageBreadcrumb";
import { Header } from "../layout/Header";
import { SideMenu } from "../layout/SideMenu";
import { DashBoardContent } from "../components/organisms/DashBoardContent";
import { useDashBoardViewModel } from "@/application/viewModels/DashBoardViewModel";

export default function DashBoardPage() {
    const {
        statCards: cards,
        chartData,
        isLoading,
        error,
        handleCSVUpload
    } = useDashBoardViewModel();

    return (
        <div className="min-h-screen w-screen bg-primary text-gray-800">
            <Header />
            <main className="flex">
                <div className="pt-4 pl-4">
                    <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
                        <SideMenu />
                    </div>
                </div>
                <div className="flex-1 flex flex-col min-h-screen">
                    <div className="flex flex-col p-8 flex-grow">
                        <div className="mb-4">
                            <PageBreadcrumb />
                        </div>
                        {/* CSV 업로드 및 상태 표시 */}
                        <div style={{ marginBottom: 24 }}>
                            <input
                                type="file"
                                accept=".csv"
                                onChange={(e) => e.target.files?.[0] && handleCSVUpload(e.target.files[0])}
                            />
                            {isLoading && <span>로딩 중...</span>}
                            {error && <span style={{ color: "red" }}>{error.message}</span>}
                        </div>
                        {/* 대시보드 콘텐츠 */}
                        <DashBoardContent
                            cards={cards}
                            chartData={chartData}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}