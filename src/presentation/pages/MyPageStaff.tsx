import { EditableListModal } from "@/presentation/components/organisms/EditableListModal";
import { useStaffViewModel } from "@/application/viewModels/useStaffViewModel";

export function MyPageStaff({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    staffList,
    isLoading,
    handleAdd,
    handleEdit,
    handleDelete,
  } = useStaffViewModel();

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
    <>
      {isOpen && (
        <EditableListModal
          title="직원 관리"
          data={staffList}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          addLabel="직원 추가"
          onClose={onClose}
        />
      )}
    </>
  );
}
