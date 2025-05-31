import { useNavigate, useSearchParams } from "react-router-dom";
import { ChartData } from "chart.js";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";
import { useCohortSingleAnalysisViewModel } from "@/application/viewModels/CohortViewModel";
import { SingleRemainHeatmapPanel } from "@/presentation/components/organisms/SingleRemainHeatmapPanel";
import { SingleInsightPanel } from "@/presentation/components/organisms/SingleInsightPanel";
import { SingleVisualizationPanel } from "@/presentation/components/organisms/SingleVisualizationPanel";

export default function AnalyticsCohortSingleCohortResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clusterType = searchParams.get("clusterType") || "장르";

  const {
    heatmap,
    doughnutChart,
    lineChart,
    insight,
    isLoading,
    error,
  } = useCohortSingleAnalysisViewModel(clusterType);

  return (
    <div className="w-screen bg-primary text-gray-800">
      <Header />
      <main className="flex">
        {/* ✅ SideMenu 는 aside로 감싸기 */}
        <aside className="w-[240px] shrink-0 pt-4 pl-4">
          <SideMenu />
        </aside>

        {/* ✅ 본문 콘텐츠: overflow 포함 */}
        <section className="flex-1 flex flex-col p-8">
          <div className="mb-4">
            <PageBreadcrumb title="Analysis/Cohort/Single" />
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
                  navigate(`/analytics/single/user-data?clusterType=${encodeURIComponent(clusterType)}`)
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
            <SingleRemainHeatmapPanel heatmap={heatmap} isLoading={isLoading} error={error} />
            <SingleVisualizationPanel
              doughnutChart={doughnutChart as ChartData<"doughnut", number[]>}
              lineChart={lineChart as ChartData<"line", number[]>}
              isLoading={isLoading}
              error={error}
            />
            <SingleInsightPanel insight={insight} isLoading={isLoading} error={error} />
          </div>
        </section>
      </main>
    </div>
  );
}
