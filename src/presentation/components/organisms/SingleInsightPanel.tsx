// /presentation/components/organisms/SingleInsightPanel.tsx
import { useAnalysisFileViewModel } from "@/application/viewModels/AnalysisViewModel";
import { getUser } from "@/application/stores/UserStore";
import { useEffect, useState, useRef, useMemo } from "react";
import { PanelTitle } from "../atoms/PanelTitle";

interface SingleInsightPanelProps {
  clusterType: string;
}

export function SingleInsightPanel({ clusterType }: SingleInsightPanelProps) {
  // ✅ getUser 호출을 상수화 (불필요한 렌더마다 호출 제거)
  const { companyNo } = useMemo(() => getUser(), []);

  // ✅ useMemo로 params 고정
  const params = useMemo(() => ({ clusterType, companyNo }), [clusterType, companyNo]);
  const { data, isLoading, error } = useAnalysisFileViewModel(params);

  const [insightContent, setInsightContent] = useState<string>("");
  const parsedRef = useRef(false);

  useEffect(() => {
    if (!data || parsedRef.current) return;
    parsedRef.current = true;

    data.text().then((text) => {
      const lines = text.trim().split("\n");
      setInsightContent(lines.length >= 2 ? lines[1] : "인사이트 없음");
    });
  }, [data]);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트" className="text-xl font-bold mb-2" />
      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {!isLoading && !error && (
        <p className="text-sm text-gray-500">{insightContent}</p>
      )}
    </div>
  );
}