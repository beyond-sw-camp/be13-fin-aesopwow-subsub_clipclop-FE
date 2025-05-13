import { PageBreadcrumb } from "../components/molecules/PageBreadcrumb";
import { Header } from "../layout/Header";
import { SideMenu } from "../layout/SideMenu";
import DashBoardContent from "../components/organisms/DashBoardContent";

export default function DashBoardPage() {
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
                        {/* PageBreadcrumb 먼저 출력 */}
                        <div className="mb-4">
                            <PageBreadcrumb />
                        </div>
                        <DashBoardContent />
                    </div>
                </div>
            </main>
        </div>
    );
}
