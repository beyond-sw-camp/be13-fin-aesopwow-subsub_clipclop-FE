// AnalyticsCohortSingleCohortResultPage.tsx
import { useSearchParams } from "react-router-dom";
import { ChartData } from "chart.js";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";
import { useCohortSingleCsvResultViewModel } from "@/application/viewModels/CohortViewModel";
import { SingleRemainHeatmapPanel } from "@/presentation/components/organisms/SingleRemainHeatmapPanel";
import { SingleInsightPanel } from "@/presentation/components/organisms/SingleInsightPanel";
import { SingleVisualizationPanel } from "@/presentation/components/organisms/SingleVisualizationPanel";

export default function AnalyticsCohortSingleCohortResultPage() {
  const [searchParams] = useSearchParams();

  const clusterType = searchParams.get("clusterType");
  const infoDbNo = searchParams.get("infoDbNo");
  const filename = searchParams.get("filename");

  const parsedInfoDbNo = infoDbNo ? Number(infoDbNo) : NaN;

  if (!clusterType || !infoDbNo || !filename || isNaN(parsedInfoDbNo)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
        필수 쿼리 파라미터가 누락되었습니다. 이전 단계에서 다시 시도해주세요.
      </div>
    );
  }

  const {
    heatmap,
    doughnutChart,
    lineChart,
    insight,
    isLoading,
    error,
    groupData,
  } = useCohortSingleCsvResultViewModel({
    clusterType,
    infoDbNo: parsedInfoDbNo,
    filename,
  });

  return (
    <div className="w-screen bg-primary text-gray-800">
      <Header />
      <main className="flex">
        <aside className="w-[240px] shrink-0 pt-4 pl-4">
          <SideMenu />
        </aside>

        <section className="flex-1 flex flex-col p-8">
          <div className="mb-4">
            <PageBreadcrumb title="Analysis/Cohort/Single" />
          </div>

          <div className="relative mb-6 w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={3} steps={[1, 2, 3]} />
              </div>
            </div>
            <div className="absolute right-0 -top-4 flex flex-col gap-2">
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
              groupData={groupData}
            />
            <SingleInsightPanel insight={insight} isLoading={isLoading} error={error} />
          </div>
        </section>
      </main>
    </div>
  );
}