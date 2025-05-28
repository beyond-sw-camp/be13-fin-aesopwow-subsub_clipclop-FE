// 📁 src/presentation/components/organisms/QnaEditForm.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';
import { useUserStore } from '@/application/stores/UserStore';

export default function QnaEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedPost, comment, loadOne, loadComment, updatePost } = useQnaViewModel();
  const { userNo: currentUserNo } = useUserStore.getState();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ 추가

  useEffect(() => {
    if (id) {
      const postId = parseInt(id, 10);
      loadOne(postId);
      loadComment(postId);
    }
  }, [id]);

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    }
  }, [selectedPost]);

  if (!selectedPost) return <p className="text-gray-500">데이터 로딩 중...</p>;

  const isAuthor = selectedPost.userNo === currentUserNo;
  const hasAnswer = !!comment;

  if (!isAuthor || hasAnswer) {
    return (
      <div className="text-red-600 font-semibold">
        {hasAnswer
          ? '이미 관리자 답변이 등록된 글은 수정할 수 없습니다.'
          : '작성자 본인만 수정할 수 있습니다.'}
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || trimmedTitle.length < 2) {
      alert('제목은 최소 2자 이상 입력해주세요.');
      return;
    }

    if (!trimmedContent || trimmedContent.length < 10) {
      alert('내용은 최소 10자 이상 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await updatePost(selectedPost.qnaPostNo, trimmedTitle, trimmedContent);
      alert('수정이 완료되었습니다.');
      navigate(`/qna/${selectedPost.qnaPostNo}`);
    } catch (error) {
      console.error('❗수정 실패:', error);
      alert('수정 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border border-gray-300 rounded px-4 py-2"
        placeholder="제목을 입력하세요"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={10}
        className="w-full border border-gray-300 rounded px-4 py-2 resize-none"
        placeholder="내용을 입력하세요"
        required
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 rounded transition-colors ${
            isSubmitting
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? '수정 중...' : '수정 완료'}
        </button>
      </div>
    </form>
  );
}
