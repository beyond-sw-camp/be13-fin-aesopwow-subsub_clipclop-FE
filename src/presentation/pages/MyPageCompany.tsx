// /presentation/pages/MyPageCompany.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { EditableListModal } from '@/presentation/components/organisms/EditableListModal';

interface CompanyInfo {
    id: number;
    title: string;
    subtitle: string;
}

export function MyPageCompany() {
    const [isOpen, setIsOpen] = useState(true);
    const [companyList, setCompanyList] = useState<CompanyInfo[]>([]);

    // 데이터 불러오기
    useEffect(() => {
        axios.get('/api/company')
            .then((res) => setCompanyList(res.data))
            .catch((err) => console.error('회사 정보 로딩 실패:', err));
    }, []);

    // 수정
    const handleEdit = async (id: number, newTitle: string, newSubtitle: string) => {
        try {
            // 1. DB에 요청 보내기
            await axios.put(`/api/company/${id}`, {
                title: newTitle,
                subtitle: newSubtitle,
            });

            // 2. 성공 시 프론트 상태 업데이트
            setCompanyList((prev) =>
                prev.map((item) =>
                    item.id === id 
                    ? { ...item, title: newTitle, subtitle: newSubtitle } 
                    : item
                )
            );
        } catch (error) {
            console.error('회사 정보 수정 실패:', error);
            alert('회사 정보를 수정하는 데 실패했습니다.');
        }
    };


    // 삭제
    const handleDelete = (id: number) => {
        if (window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
            setCompanyList((prev) => prev.filter((item) => item.id !== id));
        }
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