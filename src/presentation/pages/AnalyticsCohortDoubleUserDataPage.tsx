import { useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { DoubleUserDataPanel } from "@/presentation/components/organisms/DoubleUserDataPanel";

export default function AnalyticsCohortDoubleUserDataPage() {
  const [searchParams] = useSearchParams();
  const firstClusterType = searchParams.get("firstClusterType") || "구독 유형";
  const secondClusterType = searchParams.get("secondClusterType") || "장르";

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
            {/* ✅ 페이지 제목 및 경로 표시 */}
            <div className="mb-4">
              <PageBreadcrumb title="Analysis/Cohort/Double" />
            </div>

            {/* ✅ 단계 표시 (3단계 중 마지막) */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={3} steps={[1, 2, 3]} />
              </div>
            </div>

            {/* ✅ 본문 패널 */}
            <div className="w-full">
              <DoubleUserDataPanel
                firstClusterType={firstClusterType}
                secondClusterType={secondClusterType}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}