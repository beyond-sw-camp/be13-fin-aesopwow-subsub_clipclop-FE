// 📁 src/presentation/components/organisms/QnaAnswerForm.tsx
import { useState } from 'react';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';

interface Props {
  qnaPostNo: number;
}

export default function QnaAnswerForm({ qnaPostNo }: Props) {
  const { comment, loadComment, writeComment, updateComment } = useQnaViewModel();

  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState('');
  const [editContent, setEditContent] = useState(comment?.content || '');

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

  // 답변 수정
  const handleUpdate = async () => {
    try {
      await updateComment(qnaPostNo, editContent);
      setIsEditMode(false);
      await loadComment(qnaPostNo);
      alert('답변이 수정되었습니다.');
    } catch (error) {
      console.error('❗답변 수정 실패:', error);
      alert('답변 수정 중 오류가 발생했습니다.');
    }
  };

  // 수정 취소
  const cancelEdit = () => {
    setIsEditMode(false);
    setEditContent(comment?.content || '');
  };

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h3 className="text-lg font-bold mb-2 text-gray-800">
        {comment ? '답변 보기 / 수정' : '답변 작성'}
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

      {/* 답변이 있는 경우 */}
      {comment && !isEditMode && (
        <div>
          <p className="whitespace-pre-wrap text-gray-700">{comment.content}</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsEditMode(true)}
              className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
            >
              수정하기
            </button>
          </div>
        </div>
      )}

      {/* 수정 모드 */}
      {comment && isEditMode && (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={5}
            className="w-full border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring focus:border-yellow-500"
          />
          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={cancelEdit}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              취소
            </button>
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
