// /presentation/pages/AnalyticsCohortDoubleResultPage.tsx

import { useNavigate, useSearchParams } from "react-router-dom";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { StepProgress } from "@/presentation/components/molecules/StepProgress";
import { Header } from "@/presentation/layout/Header";
import { DoubleInsightPanel } from "@/presentation/components/organisms/DoubleInsightPanel";
import { DoubleRemainHeatmapPanel } from "@/presentation/components/organisms/DoubleRemainHeatmapPanel";
import { DoubleVisualizationPanel } from "@/presentation/components/organisms/DoubleVisualizationPanel";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";

export default function AnalyticsCohortDoubleResultPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const firstClusterType = searchParams.get("firstClusterType") ?? "";
  const secondClusterType = searchParams.get("secondClusterType") ?? "";

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
            {/* PageBreadcrumb */}
            <div className="mb-4">
              <PageBreadcrumb />
            </div>

            {/* ✅ StepProgress 가운데 + 버튼 오른쪽 */}
            <div className="relative mb-6 w-full">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  <StepProgress currentStep={2} steps={[1, 2, 3]} />
                </div>
              </div>

              <div className="absolute right-0 -top-4 flex flex-col gap-2">
                <CustomButton
                  title="유저 데이터 확인"
                  loading={false}
                  onClick={() =>
                    navigate(`/analytics/double/user-data?firstClusterType=${encodeURIComponent(firstClusterType)}&secondClusterType=${encodeURIComponent(secondClusterType)}`)
                  }
                  bgColor="bg-orange-500"
                  hoverColor="hover:bg-orange-600"
                />
                <CustomButton
                  title="데이터 내보내기"
                  loading={false}
                  onClick={() => console.log("데이터 내보내기")}
                  bgColor="bg-green-500"
                  hoverColor="hover:bg-green-600"
                />
              </div>
            </div>

            {/* 결과 패널 */}
            <div className="w-full pb-20">
              <div className="grid grid-cols-1 gap-6">
                {true && <DoubleRemainHeatmapPanel firstClusterType={firstClusterType} secondClusterType={secondClusterType} /> }
                {true && <DoubleVisualizationPanel firstClusterType={firstClusterType}  secondClusterType={secondClusterType} /> }
                {true && <DoubleInsightPanel firstClusterType={firstClusterType} secondClusterType={secondClusterType} /> }
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
