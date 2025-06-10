// import { EditableListModal } from "@/presentation/components/organisms/EditableListModal";
import { useCompanyViewModel } from "@/application/viewModels/useCompanyViewModel";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"

export function MyPageCompany({
  isOpen,
  // onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const {
    // companyList,
    isLoading,
    // handleEdit,
    // handleDelete,
  } = useCompanyViewModel();

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

  // return (
  //   // <EditableListModal
  //   //   title="회사 정보"
  //   //   data={companyList}
  //   //   onEdit={handleEdit}
  //   //   onDelete={handleDelete}
  //   //   onClose={onClose}
  //   // />

  // );
}
