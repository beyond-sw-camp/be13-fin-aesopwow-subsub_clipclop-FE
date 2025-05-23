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

  if (isLoading) return <div className="text-white">로딩 중...</div>;

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
