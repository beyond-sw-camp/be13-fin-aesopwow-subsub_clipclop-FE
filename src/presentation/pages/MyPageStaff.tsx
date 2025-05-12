// /presentation/pages/MyPageStaff.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { EditableListModal } from '@/presentation/components/organisms/EditableListModal';

interface StaffItem {
    id: number;
    title: string;
    subtitle: string;
}

export function MyPageStaff() {
    const [isOpen, setIsOpen] = useState(true);
    const [staffList, setStaffList] = useState<StaffItem[]>([]);

    // 데이터 불러오기
    useEffect(() => {
        axios.get('/api/staffs')
        .then((res) => setStaffList(res.data))
        .catch((err) => console.error('직원 정보 로딩 실패:', err));
    }, []);

    // 직원 추가
    const handleAdd = async () => {
    try {
        const res = await axios.post('/api/staffs', {
            title: `새 직원`,
            subtitle: '신규 팀',
        });

        const newStaff = res.data; // 서버에서 id 포함된 새 데이터 응답
            setStaffList((prev) => [...prev, newStaff]);
        } catch (err) {
            console.error('직원 추가 실패:', err);
            alert('직원 추가 중 오류가 발생했습니다.');
        }
    };

    // 수정
    const handleEdit = async (id: number, newTitle: string, newSubtitle: string) => {
        try {
            // 1. DB에 요청 보내기
            await axios.put(`/api/company/${id}`, {
                title: newTitle,
                subtitle: newSubtitle,
            });

            // 2. 성공 시 프론트 상태 업데이트
            setStaffList((prev) =>
                prev.map((item) =>
                    item.id === id 
                        ? { ...item, title: newTitle, subtitle: newSubtitle } 
                        : item
                )
            );
        } catch (error) {
            console.error('직원 정보 수정 실패:', error);
            alert('직원 정보를 수정하는 데 실패했습니다.');
        }
    };

    // 삭제
    const handleDelete = async (id: number) => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;

        try {
            await axios.delete(`/api/staffs/${id}`);
            setStaffList((prev) => prev.filter((item) => item.id !== id));
        } catch (err) {
            console.error('삭제 실패:', err);
            alert('삭제 중 오류가 발생했습니다.');
        }
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