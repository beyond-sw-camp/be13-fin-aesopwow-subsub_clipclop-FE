// /presentation/pages/MyPageCompany.tsx

import { useState } from 'react';
import { EditableListModal } from '@/presentation/components/organisms/EditableListModal';

const initialCompanyList = [
    { id: 1, title: '한화 시스템', subtitle: '마케팅팀' },
    { id: 2, title: '결제 방식', subtitle: '국민은행 119920-399-292-299' },
    { id: 3, title: '제공 DB정보', subtitle: 'MariaDB: aesop-sub' },
];

export function MyPageCompany() {
    const [isOpen, setIsOpen] = useState(true);
    const [companyList, setCompanyList] = useState(initialCompanyList);

    const handleEdit = (id: number) => {
        console.log(`회사 정보 수정: ${id}`);
    };

    const handleDelete = (id: number) => {
        setCompanyList((prev) => prev.filter((item) => item.id !== id));
    };

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