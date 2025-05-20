import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { SingleRequestListPanel } from "@/presentation/components/organisms/SingleRequestListPanel";

export default function AnalyticsCohortSingleRequestListPage() {

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
            {/* ✅ PageBreadcrumb 먼저 */}
            <div className="mb-4">
              <PageBreadcrumb />
            </div>

            {/* ✅ StepProgress + 버튼 */}
            <div className="relative mb-6 w-full">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <StepProgress currentStep={2} steps={[1, 2, 3]} />
                </div>
              </div>
            </div>

            {/* ✅ 분석 결과 패널 → 요청 리스트 패널로 교체 */}
            <div className="w-full pb-20">
              <div className="grid grid-cols-1 gap-6">
                <SingleRequestListPanel />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
