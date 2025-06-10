// 📁 /presentation/components/organisms/DoubleInsightPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"

interface DoubleInsightPanelProps {
  insightA: string;
  insightB: string;
  isLoading: boolean;
  error: Error | null;
}

export function DoubleInsightPanel({
  insightA,
  insightB,
  isLoading,
  error,
}: DoubleInsightPanelProps) {
  const noData =
    !isLoading &&
    !error &&
    insightA.trim() === "" &&
    insightB.trim() === "";

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트 (양측 비교)" className="text-xl font-bold mb-2" />

      {isLoading && <DotWaveLoader color="black" />}
      {error && <p className="text-sm text-red-500">{error.message}</p>}

      {noData && (
        <p className="text-sm text-gray-400">표시할 인사이트가 없습니다.</p>
      )}

      {!isLoading && !error && (
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>A:</strong> {insightA || "인사이트가 없습니다."}
          </p>
          <p>
            <strong>B:</strong> {insightB || "인사이트가 없습니다."}
          </p>
        </div>
      )}
    </div>
  );
}
