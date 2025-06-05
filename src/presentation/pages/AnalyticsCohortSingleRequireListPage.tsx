import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CohortHistoryPanel } from "../components/organisms/CohortHistoryPanel";

export default function AnalyticsCohortSingleUserDataPage() {

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
            <div className="mb-4">
              <PageBreadcrumb title="Analysis/Cohort/Single/RequireList" />
            </div>
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={2} steps={[1, 2, 3]} />
              </div>
            </div>
            <div className="w-full">
              <CohortHistoryPanel clusterType="PCL" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}