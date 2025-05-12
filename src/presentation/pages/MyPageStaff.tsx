// /presentation/pages/MyPageStaff.tsx

import { useState } from 'react';
import { EditableListModal } from '@/presentation/components/organisms/EditableListModal';

const initialStaffList = [
    { id: 1, title: '김철수', subtitle: '마케팅팀' },
    { id: 2, title: '이영희', subtitle: '디자인팀' },
];

export function MyPageStaff() {
    const [isOpen, setIsOpen] = useState(true);
    const [staffList, setStaffList] = useState(initialStaffList);
    const [nextId, setNextId] = useState(3);

    const handleEdit = (id: number) => {
        console.log(`직원 수정: ${id}`);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('정말로 이 회사 정보를 삭제하시겠습니까?')) {
        setStaffList((prev) => prev.filter((item) => item.id !== id));
        }
    };

    const handleAdd = () => {
        setStaffList((prev) => [
        ...prev,
        {
            id: nextId,
            title: `새 직원 ${nextId}`,
            subtitle: '신규 팀',
        },
        ]);
        setNextId((id) => id + 1);
    };

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
            onClose={() => setIsOpen(false)}
            />
        )}
        </>
    );
}