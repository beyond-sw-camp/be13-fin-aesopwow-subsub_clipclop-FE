// 📁 src/presentation/components/organisms/QnaAnswerForm.tsx
import { useState } from 'react';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';

interface Props {
  qnaPostNo: number;
}

export default function QnaAnswerForm({ qnaPostNo }: Props) {
  const [content, setContent] = useState('');
  const { loadComment, writeComment } = useQnaViewModel();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await writeComment(qnaPostNo, content);
      setContent('');
      await loadComment(qnaPostNo); // 답변 등록 후 갱신
    } catch (error) {
      alert('답변 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-4 shadow bg-white">
      <h3 className="text-lg font-bold mb-2 text-gray-800">답변 작성</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="답변 내용을 입력하세요"
        rows={5}
        required
        className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:border-blue-500"
      />
      <div className="flex justify-end mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
        >
          답변 등록
        </button>
      </div>
    </form>
  );
}
