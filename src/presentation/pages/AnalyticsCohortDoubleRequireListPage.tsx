import { useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { CohortHistoryPanel } from "../components/organisms/CohortHistoryPanel";

export default function AnalyticsCohortDoubleRequireListPage() {
  const [searchParams] = useSearchParams();
  const firstClusterType = searchParams.get("firstClusterType") || "PCL";
  const secondClusterType = searchParams.get("secondClusterType") || "SubscriptionType";

  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800">
      <Header />
      <main className="flex">
        {/* Sidebar */}
        <aside className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu />
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col min-h-screen">
          <div className="flex flex-col p-8 flex-grow">
            {/* Breadcrumb */}
            <div className="mb-4">
              <PageBreadcrumb title="Analysis/Cohort/Double/RequireList" />
            </div>

            {/* Step Progress */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-4xl">
                <StepProgress currentStep={2} steps={[1, 2, 3]} />
              </div>
            </div>

            {/* 요청 내역 패널 */}
            <div className="w-full space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-2">{firstClusterType} 요청 내역</h2>
                <CohortHistoryPanel clusterType={firstClusterType} />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-2">{secondClusterType} 요청 내역</h2>
                <CohortHistoryPanel clusterType={secondClusterType} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
