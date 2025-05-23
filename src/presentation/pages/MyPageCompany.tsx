// /presentation/pages/MyPageCompany.tsx

import { useState } from "react";
import { EditableListModal } from "@/presentation/components/organisms/EditableListModal";
import { useCompanyViewModel } from "@/application/viewModels/useCompanyViewModel";

export function MyPageCompany() {
    const [isOpen, setIsOpen] = useState(true);
    const {
        companyList,
        isLoading,
        handleEdit,
        handleDelete,
    } = useCompanyViewModel();

    if (isLoading) return <div className="text-white">로딩 중...</div>;

    return (
        <>
            {isOpen && (
                <EditableListModal
                    title="회사 정보"
                    data={companyList}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}