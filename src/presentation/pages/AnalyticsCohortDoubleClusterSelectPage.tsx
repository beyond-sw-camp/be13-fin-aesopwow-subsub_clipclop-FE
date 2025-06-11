import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { DoubleClusterSelectionPanel } from "../components/organisms/DoubleClusterSelectionPanel";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import ProtectedRoute from "../components/organisms/LoginProtectedRoute";

export default function AnalyticsCohortSingleClusterSelectPage() {
  return (
      <ProtectedRoute>
    <div className="min-h-screen w-screen bg-primary text-gray-800">
      <Header />

      <main className="flex">
        {/* Sidebar */}
        <div className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu isLoggedIn={true}/>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="flex flex-col p-8 flex-grow">
            {/* PageBreadcrumb 먼저 출력 */}
            <div className="mb-4">
              <PageBreadcrumb title="코호트 간 비교 분석" />
            </div>

            {/* StepProgress 중앙 정렬 및 하단 간격 조정 */}
            <div className="flex justify-center mb-4">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={1} />
              </div>
            </div>

            {/* 본문 콘텐츠 */}
            <div className="w-full mb-6">
              <DoubleClusterSelectionPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
      </ProtectedRoute>
  );
}