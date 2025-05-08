import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { RemainHeatmapPanel } from "@/presentation/components/organisms/RemainHeatmapPanel";
import { InsightPanel } from "@/presentation/components/organisms/InsightPanel";
import { VisualizationPanel } from "../components/organisms/VisualizationPanel";

export default function AnalyticsCohortSingleCohortResultPage() {
  const [searchParams] = useSearchParams();
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
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={2} steps={[1, 2, 3]} />
              </div>
            </div>
            <div className="w-full pb-20">
              <div className="mb-4">
                <PageBreadcrumb />
              </div>
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