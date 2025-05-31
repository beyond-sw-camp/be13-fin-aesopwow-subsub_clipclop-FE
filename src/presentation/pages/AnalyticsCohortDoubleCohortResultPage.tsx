import { useNavigate, useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { DoubleInsightPanel } from "@/presentation/components/organisms/DoubleInsightPanel";
import { DoubleRemainHeatmapPanel } from "@/presentation/components/organisms/DoubleRemainHeatmapPanel";
import { DoubleVisualizationPanel } from "@/presentation/components/organisms/DoubleVisualizationPanel";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";
import { useCohortDoubleAnalysisViewModel } from "@/application/viewModels/CohortViewModel";

export default function AnalyticsCohortDoubleCohortResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const firstClusterType = searchParams.get("firstClusterType") ?? "";
  const secondClusterType = searchParams.get("secondClusterType") ?? "";

  const { resultA, resultB, isLoading, error } =
    useCohortDoubleAnalysisViewModel(firstClusterType, secondClusterType);

  return (
    <div className="w-screen bg-primary text-gray-800">
      {/* ✅ 일반 Header (스크롤에 포함됨) */}
      <Header />
      {/* ✅ 본문 전체 스크롤 */}
      <main className="flex">
        {/* ✅ 사이드 메뉴 (스크롤에 포함됨) */}
        <aside className="w-[240px] shrink-0 pt-4 pl-4">
          <SideMenu />
        </aside>

        {/* ✅ 본문 콘텐츠 (스크롤 포함) */}
        <section className="flex-1 flex flex-col p-8">
          <div className="mb-4">
            <PageBreadcrumb title="Analysis/Cohort/Double" />
          </div>

          <div className="relative mb-6 w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={2} steps={[1, 2, 3]} />
              </div>
            </div>

            <div className="absolute right-0 -top-4 flex flex-col gap-2">
              <CustomButton
                title="유저 데이터 확인"
                loading={false}
                onClick={() =>
                  navigate(
                    `/analytics/double/user-data?firstClusterType=${encodeURIComponent(
                      firstClusterType
                    )}&secondClusterType=${encodeURIComponent(secondClusterType)}`
                  )
                }
                color="orange"
              />
              <CustomButton
                title="데이터 내보내기"
                loading={false}
                onClick={() => console.log("데이터 내보내기")}
                color="green"
              />
            </div>
          </div>

          <div className="w-full pb-20 space-y-6">
            <DoubleRemainHeatmapPanel
              heatmapA={resultA.heatmap}
              heatmapB={resultB.heatmap}
              insightA={resultA.insight}
              isLoading={isLoading}
              error={error}
            />
            <DoubleVisualizationPanel
              doughnutChartA={resultA.doughnutChart}
              lineChartA={resultA.lineChart}
              doughnutChartB={resultB.doughnutChart}
              lineChartB={resultB.lineChart}
              isLoading={isLoading}
              error={error}
              firstClusterType={firstClusterType}
              secondClusterType={secondClusterType}
            />
            <DoubleInsightPanel
              insightA={resultA.insight}
              insightB={resultB.insight}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </section>
      </main>
    </div>
  );
}
