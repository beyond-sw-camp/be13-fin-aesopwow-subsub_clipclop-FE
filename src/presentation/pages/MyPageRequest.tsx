import { EditableListModal } from "@/presentation/components/organisms/EditableListModal";
import { useRequestViewModel } from "@/application/viewModels/useRequestViewModel";

interface MyPageRequestProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MyPageRequest({ isOpen, onClose }: MyPageRequestProps) {
  const {
    requestList,
    isLoading,
  } = useRequestViewModel();

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-gray-700">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <EditableListModal
      title="요청 내역"
      data={requestList}
      onEdit={() => {}}
      onDelete={() => {}}
      onClose={onClose}
    />
  );
}