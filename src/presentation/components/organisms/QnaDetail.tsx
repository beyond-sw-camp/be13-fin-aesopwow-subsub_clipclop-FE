import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';
import QnaAnswerForm from './QnaAnswerForm';
import { useUserStore } from '@/application/stores/UserStore';

export default function QnaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPost, comment, loadOne, loadComment, deletePost } = useQnaViewModel();
  const { userNo: currentUserNo, roleNo } = useUserStore.getState();

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

  const isAuthor = Number(selectedPost.userNo) === Number(currentUserNo);
  const isAdmin = roleNo === 1;
  const hasAnswer = !!comment;

  const handleEdit = () => {
    navigate(`/qna/edit/${selectedPost.qnaPostNo}`);
  };

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm('정말로 이 문의를 삭제하시겠습니까?')) {
      try {
        await deletePost(parseInt(id));
        alert('삭제되었습니다.');
        navigate('/qna');
      } catch (error) {
        console.error('❗삭제 실패:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-orange-500 flex justify-center items-start py-16 px-4">
      <div className="bg-white w-full max-w-6xl p-12 rounded-xl shadow-md space-y-8">

        {/* 문의 내용 */}
        <div className="border rounded p-6 shadow-sm bg-white">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{selectedPost.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{selectedPost.createdAt}</p>
          <p className="text-sm text-gray-700 mb-4">{selectedPost.content}</p>

          <div className="flex justify-end gap-2">
            {isAuthor && !hasAnswer && (
              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                수정
              </button>
            )}
            {(isAuthor || isAdmin) && (
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                삭제
              </button>
            )}
          </div>
        </div>

        {/* 관리자 답변 */}
        <div className="border rounded p-6 bg-gray-50 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">[관리자 답변]</h3>
          {comment ? (
            <div className="text-gray-800 whitespace-pre-wrap">{comment.content}</div>
          ) : (
            <div className="text-gray-400">아직 답변이 없습니다.</div>
          )}
        </div>

        {/* 관리자만 답변 작성 가능 */}
        {isAdmin && id && (
          <div className="border rounded p-6 bg-gray-50 shadow-sm">
            <QnaAnswerForm qnaPostNo={parseInt(id, 10)} />
          </div>
        )}
      </div>
    </div>
  );
}
