// 📁 src/presentation/components/organisms/QnaAnswerForm.tsx
import { useState } from 'react';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';

interface Props {
  qnaPostNo: number;
}

export default function QnaAnswerForm({ qnaPostNo }: Props) {
  const { comment, loadComment, writeComment } = useQnaViewModel();

  const [content, setContent] = useState('');

  // 신규 답변 등록
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment) {
      alert('이미 답변이 등록된 문의입니다.');
      return;
    }

    try {
      await writeComment(qnaPostNo, content);
      setContent('');
      await loadComment(qnaPostNo);
      alert('답변이 등록되었습니다.');
    } catch (error) {
      console.error('❗답변 등록 실패:', error);
      alert('답변 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="text-lg font-bold mb-2 text-gray-800">
        {comment ? '등록된 답변' : '답변 작성'}
      </h3>

      {/* 답변이 없는 경우 → 새로 작성 */}
      {!comment && (
        <form onSubmit={handleCreate}>
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
      )}

      {/* 답변이 있는 경우 → 읽기 전용 표시 */}
      {comment && (
        <div className="bg-gray-50 text-gray-800 whitespace-pre-wrap p-4 rounded border border-gray-300">
          {comment.content}
        </div>
      )}
    </div>
  );
}
