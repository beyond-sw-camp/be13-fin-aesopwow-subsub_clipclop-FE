import { CohortTabs } from "../components/molecules/CohortSegmentSelector";
import { TopNav } from "@/utils/TopNav";
import { PageBreadcrumb } from "@/utils/PageBreadcrumb";
import { SideMenu } from "@/utils/SideMenu";
import { ProjectLogo } from "@/utils/ProjectLogo";
import { ProfileAvatar } from "@/utils/ProfileAvatar";
import { ClusterSelectionPanel } from "../components/organisms/ClusterSelectionPanel";

export default function AnalyticsCohortSinglePage() {
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
            <div className="w-full pb-20"> {/* max-w-7xl 제거 또는 조정 */}
              <div className="mb-4">
                <PageBreadcrumb />
              </div>
              <div className="flex justify-center mb-6">
                <CohortTabs />
              </div>
              {/* ❗ 여기서 col 나누는 대신 전체 폭 사용 */}
              <div className="w-full">
                <ClusterSelectionPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

