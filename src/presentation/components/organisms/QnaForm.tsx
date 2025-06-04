// src/presentation/components/organisms/QnaForm.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';

export default function QnaForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { writePost } = useQnaViewModel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writePost(title, content);
      alert('문의가 등록되었습니다.');
      navigate('/qna');
    } catch (error) {
      console.error('❗ 문의 등록 오류:', error);
      alert('문의 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">문의 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          rows={10}
          className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:border-blue-500"
          required
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}