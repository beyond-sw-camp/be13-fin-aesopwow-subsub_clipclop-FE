// /presentation/pages/SegmentCohortPage.tsx

import { useState } from "react";
import { SegmentKeywordSelector } from "../components/molecules/SegmentKeywordSelector";
import { SegmentSearchBar } from "../components/atoms/SegmentSearchBar";
import { BehaviorPatternPanel } from "../components/organisms/BehaviorPatternPanel";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb.tsx";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { SegmentSearchResultModal } from "../components/organisms/SegmentSearchResultModal";
import { CohortTabs } from "../components/molecules/CohortSegmentSelector";
import { Header } from "@/presentation/layout/Header"; // ✅ Header 컴포넌트

export default function SegmentCohortPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [keyword, setKeyword] = useState<string>("");
  const [tag, setTag] = useState<string>("");

  const handleSearch = (newKeyword: string, newTag: string) => {
    setKeyword(newKeyword);
    setTag(newTag);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
      <div className="min-h-screen w-screen bg-primary text-gray-800"> {/* ✅ 전체 배경 적용 */}
        <Header /> {/* ✅ 흰 여백 제거됨 */}
        <main className="flex">
          {/* Sidebar */}
          <div className="pt-4 pl-4">
            <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
              <SideMenu />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
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
                      <SegmentKeywordSelector />
                    </div>
                    <div className="w-full md:w-3/4 flex flex-col gap-4">
                      <SegmentSearchBar onSearch={handleSearch} />
                      <BehaviorPatternPanel />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Modal */}
        {isModalOpen && (
            <SegmentSearchResultModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                keyword={keyword}
                tag={tag}
            />
        )}
      </div>
  );
}