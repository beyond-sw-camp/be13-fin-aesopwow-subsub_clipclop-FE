// /presentation/components/organisms/RemainHeatmapPanel.tsx

import { PanelTitle } from "../atoms/PanelTitle";
import { useCohortRemainHeatmapViewModel } from "@/application/viewModels/CohortViewModel";

export function RemainHeatmapPanel() {
    const { data, loading, error } = useCohortRemainHeatmapViewModel();

    return (
        <div className="p-6 bg-white rounded-xl shadow h-full min-h-[200px]">
            <h2 className="text-xl font-bold mb-2">잔존율 히트맵</h2>
            {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {data && (
                <>
                    <PanelTitle title={data.title} />
                    <p className="text-sm text-gray-500">{data.content}</p>
                    <div className="mt-4">
                        <img
                            src={data.heatmapImageBase64}
                            alt="히트맵"
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                </>
            )}
        </div>
    );
}