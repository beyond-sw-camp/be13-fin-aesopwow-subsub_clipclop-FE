// /presentation/pages/AnalyticsCohortPage.tsx
import { CohortTabs } from "../components/molecules/CohortSegmentSelector";
import { BehaviorPatternPanel } from "../components/organisms/BehaviorPatternPanel";
import { RemainHeatmapPanel } from "../components/organisms/RemainHeatmapPanel.tsx";
import { InsightPanel } from "../components/organisms/InsightPanel";
import { TopNav } from "@/utils/TopNav";
import { PageBreadcrumb } from "@/utils/PageBreadcrumb";
import { SideMenu } from "@/utils/SideMenu";
import { ProjectLogo } from "@/utils/ProjectLogo";
import { ProfileAvatar } from "@/utils/ProfileAvatar";
import { FileUploadButton } from "@/presentation/components/atoms/FileUploadButton";

export default function AnalyticsCohortPage() {
  return (
    <>
      <ProfileAvatar />
      <div className="min-h-screen w-screen bg-primary text-gray-800 flex">
        <div className="pt-4 pl-4">
          <ProjectLogo />
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu />
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-screen">
          <TopNav />
          <div className="flex justify-end p-8 flex-grow">
            <div className="w-full max-w-7xl pb-20">
              <div className="mb-4">
                <PageBreadcrumb />
              </div>
              <div className="flex justify-center mb-6">
                <CohortTabs />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BehaviorPatternPanel />
                <RemainHeatmapPanel />
              </div>
              <div className="mt-6">
                <InsightPanel />
                <div className="mt-6 flex justify-center">
                  <FileUploadButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
