import { CohortTabs } from "../components/molecules/CohortSegmentSelector";
import { TopNav } from "@/utils/TopNav";
import { PageBreadcrumb } from "@/utils/PageBreadcrumb";
import { SideMenu } from "@/utils/SideMenu";
import { ProjectLogo } from "@/utils/ProjectLogo";
import { ProfileAvatar } from "@/utils/ProfileAvatar";
import { ClusterSelectionPanel } from "@/presentation/components/organisms/ClusterSelectionPanel";

export default function AnalyticsCohortSinglePage() {
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
                <ClusterSelectionPanel />
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
