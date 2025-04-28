// /presentation/components/organisms/InsightPanel.tsx
import { PanelTitle } from "../atoms/PanelTitle";
import { useCohortInsightViewModel } from "@/application/viewModels/CohortInsightViewModel";

/**
 * Displays an insight panel with dynamic content based on loading, error, and data states.
 *
 * Renders a static heading and conditionally shows a loading message, error message, or fetched insight data.
 */
export function InsightPanel() {
  const { data, loading, error } = useCohortInsightViewModel();

  return (
    <div className="p-6 bg-white rounded-xl shadow w-full min-h-[200px]">
      <h2 className="text-xl font-bold mb-2">인사이트</h2>

      {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!loading && !error && data && (
        <>
          <PanelTitle title={data.title} />
          <p className="text-sm text-gray-500">{data.content}</p>
        </>
      )}
    </div>
  );
}
