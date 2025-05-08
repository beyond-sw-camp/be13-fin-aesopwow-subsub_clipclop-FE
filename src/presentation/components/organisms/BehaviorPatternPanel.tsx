// /presentation/components/organisms/BehaviorPatternPanel.tsx

import { PanelTitle } from "../atoms/PanelTitle";
import { useCohortBehaviorPatternViewModel } from "@/application/viewModels/CohortViewModel";

export function BehaviorPatternPanel() {
    const { data, loading, error } = useCohortBehaviorPatternViewModel();

    return (
        <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
            <h2 className="text-xl font-bold mb-2">행동 패턴 비교</h2>
            {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {data && (
                <>
                    <PanelTitle title={data.title} />
                    <p className="text-sm text-gray-500">{data.content}</p>
                </>
            )}
        </div>
    );
}