import { useParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { ClusterSelectionPanel } from "../components/organisms/ClusterSelectionPanel";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";

export default function AnalyticsCohortSinglePage() {
  const { stepId } = useParams(); // step1, step2, step3
  const currentStep = Number(stepId?.replace("step", "")) || 1;

  return (
      <div className="min-h-screen w-screen bg-primary text-gray-800">
        <Header /> {/* ✅ 상단에 단독으로 위치 */}

        <main className="flex">
          <div className="pt-4 pl-4">
            <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
              <SideMenu />
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-screen">
            <div className="flex justify-end p-8 flex-grow">
              <div className="w-full pb-20">
                <div className="mb-4">
                  <PageBreadcrumb />
                </div>
                <div className="flex justify-center mb-6">
                  <StepProgress currentStep={currentStep} steps={[1, 2, 3]} />
                </div>
                <div className="w-full mb-6">
                  <ClusterSelectionPanel />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}