// /presentation/components/organisms/DoubleInsightPanel.tsx
import { useAnalysisFileViewModel } from "@/application/viewModels/AnalysisViewModel";
import { getUser } from "@/application/stores/UserStore";
import { useEffect, useState, useRef, useMemo } from "react";
import { PanelTitle } from "../atoms/PanelTitle";

interface DoubleInsightPanelProps {
  firstClusterType: string;
  secondClusterType: string;
}

export function DoubleInsightPanel({ firstClusterType, secondClusterType }: DoubleInsightPanelProps) {
  // ✅ getUser 호출 고정
  const { companyNo } = useMemo(() => getUser(), []);

  // ✅ params 고정
  const params = useMemo(
    () => ({ firstClusterType, secondClusterType, companyNo }),
    [firstClusterType, secondClusterType, companyNo]
  );

  const { data, isLoading, error } = useAnalysisFileViewModel(params);

  const [firstContent, setFirstContent] = useState<string>("");
  const [secondContent, setSecondContent] = useState<string>("");

  const parsedRef = useRef(false);

  useEffect(() => {
    if (!data || parsedRef.current) return;
    parsedRef.current = true;

    data.text().then((text) => {
      const lines = text.trim().split("\n");
      if (lines.length >= 2) {
        const values = lines[1].split(",");
        setFirstContent(values[0] ?? "");
        setSecondContent(values[1] ?? "");
      }
    });
  }, [data]);

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트 (양측 비교)" className="text-xl font-bold mb-2" />
      {isLoading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error.message}</p>}
      {!isLoading && !error && (
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>A:</strong> {firstContent || "데이터 없음"}
          </p>
          <p>
            <strong>B:</strong> {secondContent || "데이터 없음"}
          </p>
        </div>
      )}
    </div>
  );
}