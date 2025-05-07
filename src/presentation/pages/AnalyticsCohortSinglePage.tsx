// /presentation/pages/AnalyticsCohortSinglePage.tsx

import { useParams } from "react-router-dom";
import { TopNav } from "@/presentation/components/molecules/TopNav.tsx";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb.tsx";
import { SideMenu } from "@/utils/SideMenu";
import { ProjectLogo } from "@/utils/ProjectLogo";
import { ProfileAvatar } from "@/utils/ProfileAvatar";
import { ClusterSelectionPanel } from "../components/organisms/ClusterSelectionPanel";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";

export default function AnalyticsCohortSinglePage() {
  const { stepId } = useParams(); // step1, step2, step3
  const currentStep = Number(stepId?.replace("step", "")) || 1;

  return (
    <>
      <ProfileAvatar />
      <div className="min-h-screen w-screen bg-primary text-gray-800 flex overflow-x-hidden">
        <div className="pt-4 pl-4">
          <ProjectLogo />
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu />
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-screen">
          <TopNav />
          <div className="flex justify-end p-8 flex-grow">
            <div className="w-full pb-20">
              <div className="mb-4">
                <PageBreadcrumb />
              </div>

              {/* StepProgress 컨테이너 */}
              <div className="flex justify-center mb-6">
                <StepProgress currentStep={currentStep} steps={[1, 2, 3]} />
              </div>

              {/* 해당 단계별 패널 (예: 현재는 하나만 보여줌) */}
              <div className="w-full mb-6">
                <ClusterSelectionPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
