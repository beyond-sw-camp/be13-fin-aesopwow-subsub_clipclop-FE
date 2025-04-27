// /presentation/pages/SegmentCohortPage.tsx
import { useState } from "react";
import { KeywordSelector } from "../components/molecules/KeywordSelector";
import { SearchBar } from "../components/atoms/SearchBar";
import { BehaviorPatternPanel } from "../components/organisms/BehaviorPatternPanel";
import { TopNav } from "@/utils/TopNav";
import { PageBreadcrumb } from "@/utils/PageBreadcrumb";
import { SideMenu } from "@/utils/SideMenu";
import { ProjectLogo } from "@/utils/ProjectLogo";
import { ProfileAvatar } from "@/utils/ProfileAvatar";
import { SegmentSearchResultModal } from "../components/organisms/SegmentSearchResultModal";
import { CohortTabs } from "../components/molecules/CohortSegmentSelector";

export default function SegmentCohortPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const handleSearch = () => {
    setSearchResults(["예시 결과 1", "예시 결과 2", "예시 결과 3"]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/4">
                    <KeywordSelector />
                  </div>
                  <div className="w-full md:w-3/4 flex flex-col gap-4">
                    <SearchBar onSearch={handleSearch} />
                    <BehaviorPatternPanel />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <SegmentSearchResultModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          searchResults={searchResults}
        />
      )}
    </>
  );
}