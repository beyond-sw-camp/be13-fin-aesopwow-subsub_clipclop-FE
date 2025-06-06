// AnalyticsCohortDoubleCohortResultPage.tsx
import { useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";
import { useCohortSingleCsvResultViewModel } from "@/application/viewModels/CohortViewModel";
import { SingleRemainHeatmapPanel } from "@/presentation/components/organisms/SingleRemainHeatmapPanel";
import { SingleInsightPanel } from "@/presentation/components/organisms/SingleInsightPanel";
import { SingleVisualizationPanel } from "@/presentation/components/organisms/SingleVisualizationPanel";

function parseKey(key: string | null) {
  if (!key) return null;
  const parts = key.split("/");
  if (parts.length < 4) return null;
  return {
    infoDbNo: Number(parts[0]),
    clusterType: parts[2],
    filename: parts[3],
  };
}

export default function AnalyticsCohortDoubleCohortResultPage() {
  const [searchParams] = useSearchParams();
  const parsed1 = parseKey(searchParams.get("file1"));
  const parsed2 = parseKey(searchParams.get("file2"));

  if (!parsed1 || !parsed2 || isNaN(parsed1.infoDbNo) || isNaN(parsed2.infoDbNo)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 text-lg">
        ❌ 필수 파라미터가 누락되었습니다. 이전 단계에서 다시 시도해주세요.
      </div>
    );
  }

  const {
    heatmap: heatmap1,
    doughnutChart: doughnut1,
    lineChart: line1,
    insight: insight1,
    isLoading: isLoading1,
    error: error1,
    groupData: groupData1,
  } = useCohortSingleCsvResultViewModel(parsed1);

  const {
    heatmap: heatmap2,
    doughnutChart: doughnut2,
    lineChart: line2,
    insight: insight2,
    isLoading: isLoading2,
    error: error2,
    groupData: groupData2,
  } = useCohortSingleCsvResultViewModel(parsed2);

  return (
    <div className="w-screen bg-primary text-gray-800">
      <Header />
      <main className="flex">
        <aside className="w-[240px] shrink-0 pt-4 pl-4">
          <SideMenu />
        </aside>

        <section className="flex-1 flex flex-col p-8">
          <div className="mb-4">
            <PageBreadcrumb title="Analysis/Cohort/Double/Result" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
            {/* 왼쪽 분석 결과 */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-blue-700">
                {parsed1.clusterType || "왼쪽 분석"}
              </h2>
              <SingleRemainHeatmapPanel heatmap={heatmap1} isLoading={isLoading1} error={error1} />
              <SingleVisualizationPanel
                doughnutChart={doughnut1}
                lineChart={line1}
                isLoading={isLoading1}
                error={error1}
                groupData={groupData1}
              />
              <SingleInsightPanel insight={insight1} isLoading={isLoading1} error={error1} />
            </div>

            {/* 오른쪽 분석 결과 */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-center text-red-700">
                {parsed2.clusterType || "오른쪽 분석"}
              </h2>
              <SingleRemainHeatmapPanel heatmap={heatmap2} isLoading={isLoading2} error={error2} />
              <SingleVisualizationPanel
                doughnutChart={doughnut2}
                lineChart={line2}
                isLoading={isLoading2}
                error={error2}
                groupData={groupData2}
              />
              <SingleInsightPanel insight={insight2} isLoading={isLoading2} error={error2} />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
