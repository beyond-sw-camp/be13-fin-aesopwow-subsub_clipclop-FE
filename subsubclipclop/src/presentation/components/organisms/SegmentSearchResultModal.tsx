// /presentation/components/organisms/SegmentSearchResultModal.tsx
import { useEffect } from "react";

interface SegmentSearchResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchResults: string[];
}

export function SegmentSearchResultModal({ isOpen, onClose, searchResults }: SegmentSearchResultModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">검색 결과</h2>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {searchResults.map((result, index) => (
            <div key={index} className="p-4 border rounded-md">
              {result}
            </div>
          ))}
        </div>
        <button
          className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
