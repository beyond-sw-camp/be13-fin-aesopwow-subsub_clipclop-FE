import { useState } from "react";
import { toast } from "react-toastify";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"

import { useStaffViewModel } from "@/application/viewModels/useStaffViewModel";

import { EmailInputModal } from "@/presentation/components/molecules/EmailInputModal";
import { EditableListModal } from "@/presentation/components/organisms/EditableListModal";

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

  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleSubmitEmail = async (email: string) => {
    try {
      await handleAdd(email);
      setShowEmailModal(false);
    } catch (err) {
      toast.error("직원 추가에 실패했습니다.");
    }
  };

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <DotWaveLoader color="black" />
        </div>
      </div>
    );
  }

  return (
    <>
      <EditableListModal
        title="직원 관리"
        data={staffList.map((item) => ({
          id: item.userNo,
          name: item.name,
          departmentName: item.departmentName || "",
        }))}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={() => setShowEmailModal(true)}
        addLabel="직원 추가"
        onClose={onClose}
      />
      {showEmailModal && (
        <EmailInputModal
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleSubmitEmail}
        />
      )}
    </>
  );
}
