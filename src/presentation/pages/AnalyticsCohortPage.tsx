// /presentation/pages/AnalyticsCohortPage.tsx
import { CohortTabs } from "../components/molecules/CohortSegmentSelector.tsx";
import { BehaviorPatternPanel } from "../components/organisms/BehaviorPatternPanel.tsx";
import { RetentionHeatmapPanel } from "../components/organisms/RetentionHeatmapPanel.tsx";
import { InsightPanel } from "../components/organisms/InsightPanel.tsx";
import { TopNav } from "@/utils/TopNav.tsx";
import { PageBreadcrumb } from "@/utils/PageBreadcrumb.tsx";
import { SideMenu } from "@/utils/SideMenu.tsx";
import { ProjectLogo } from "@/utils/ProjectLogo.tsx";
import { ProfileAvatar } from "@/utils/ProfileAvatar.tsx";

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
                <RetentionHeatmapPanel />
              </div>
              <div className="mt-6">
                <InsightPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
