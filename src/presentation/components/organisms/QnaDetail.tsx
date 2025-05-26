// 📁 src/presentation/components/organisms/QnaDetail.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';
import QnaAnswerForm from './QnaAnswerForm';
import { useUserStore } from '@/application/stores/UserStore';

export default function QnaDetail() {
  const { id } = useParams();
  const { selectedPost, comment, loadOne, loadComment } = useQnaViewModel();
  const { role } = useUserStore.getState(); // 현재 사용자 권한 (예: ADMIN, USER)

  useEffect(() => {
    if (id) {
      const postId = parseInt(id, 10);
      loadOne(postId);
      loadComment(postId);
    }
  }, [id]);

  if (!selectedPost) {
    return <div className="p-6 text-gray-500">문의 내용을 불러오는 중입니다...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* 문의 내용 */}
      <div className="border rounded p-4 bg-white shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedPost.title}</h2>
        <p className="text-sm text-gray-500 mb-4">{selectedPost.createdAt}</p>
        <p className="text-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
      </div>

      {/* 관리자 답변 */}
      <div className="border rounded p-4 bg-gray-50 shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">[관리자 답변]</h3>
        {comment ? (
          <div className="text-gray-800 whitespace-pre-wrap">{comment.content}</div>
        ) : (
          <div className="text-gray-400">아직 답변이 없습니다.</div>
        )}
      </div>

      {/* 관리자만 답변 입력 가능 */}
      {role === 'ADMIN' && id && (
        < QnaAnswerForm qnaPostNo={parseInt(id, 10)} />
      )}
    </div>
  );
}
