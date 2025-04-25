// /presentation/components/organisms/InsightPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";

export function InsightPanel() {
  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <PanelTitle title="인사이트" />
      <p className="text-sm text-gray-500">분석 기반 인사이트를 여기에 보여줍니다.</p>
    </div>
  );
}
