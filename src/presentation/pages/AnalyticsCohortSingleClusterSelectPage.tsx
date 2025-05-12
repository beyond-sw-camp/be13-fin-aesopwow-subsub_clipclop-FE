import { useParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { ClusterSelectionPanel } from "../components/organisms/ClusterSelectionPanel";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";

export default function AnalyticsCohortSingleClusterSelectPage() {

  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800">
      <Header />

      <main className="flex">
        {/* Sidebar */}
        <div className="pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
        <div className="flex flex-col p-8 flex-grow">
          {/* StepProgress만 정렬 및 폭 제한 */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-4xl">
              <StepProgress currentStep={1} steps={[1, 2, 3]} />
            </div>
          </div>

          {/* 나머지 콘텐츠는 w-full 유지 */}
          <div className="w-full pb-20">
            <div className="mb-4">
              <PageBreadcrumb />
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