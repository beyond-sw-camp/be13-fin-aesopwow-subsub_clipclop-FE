// 📁 /presentation/components/organisms/ShapResultSummaryModal.tsx
interface Props {
  open: boolean;
  onClose: () => void;
  mode: "entire" | "user";
  summary: {
    positive: string;
    특징: string;
    패턴: string;
    추천액션: string;
  } | null;
}

export function ShapResultSummaryModal({ open, onClose, mode, summary }: Props) {
  if (!open || !summary) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          SHAP 분석 요약 ({mode === "entire" ? "Entire User" : "User"})
        </h2>
        <ul className="space-y-2 text-sm">
          <li><strong>Positive:</strong> {summary.positive}</li>
          <li><strong>특징:</strong> {summary.특징}</li>
          <li><strong>패턴:</strong> {summary.패턴}</li>
          <li><strong>추천 액션:</strong> {summary.추천액션}</li>
        </ul>
        <div className="text-right mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
