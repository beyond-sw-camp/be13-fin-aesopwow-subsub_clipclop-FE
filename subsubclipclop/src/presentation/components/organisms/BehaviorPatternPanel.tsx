// /presentation/components/organisms/BehaviorPatternPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";

export function BehaviorPatternPanel() {
  return (
    <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
      <PanelTitle title="행동 패턴 비교" />
      <p className="text-sm text-gray-500">시청률 vs 구독 전환율 상관관계 분석</p>
    </div>
  );
}