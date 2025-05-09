import { useNavigate, useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { RemainHeatmapPanel } from "@/presentation/components/organisms/RemainHeatmapPanel";
import { InsightPanel } from "@/presentation/components/organisms/InsightPanel";
import { VisualizationPanel } from "../components/organisms/VisualizationPanel";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";

export default function AnalyticsCohortSingleCohortResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const clusterType = searchParams.get("clusterType") || "장르";

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

            {/* ✅ StepProgress 가운데 + 버튼 오른쪽 */}
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
                  } // ✅ 쿼리로 전달
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


            {/* ✅ 본문 패널들 */}
            <div className="w-full pb-20">
              <div className="grid grid-cols-1 gap-6">
                <RemainHeatmapPanel clusterType={clusterType} />
                <VisualizationPanel clusterType={clusterType} />
                <InsightPanel clusterType={clusterType} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
