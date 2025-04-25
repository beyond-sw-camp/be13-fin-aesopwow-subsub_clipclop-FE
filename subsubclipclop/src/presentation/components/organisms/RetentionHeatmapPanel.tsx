// /presentation/components/organisms/RetentionHeatmapPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";

export function RetentionHeatmapPanel() {
  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
      <PanelTitle title="잔존율 히트맵" />
      <p className="text-sm text-gray-500">테이블</p>
    </div>
  );
}