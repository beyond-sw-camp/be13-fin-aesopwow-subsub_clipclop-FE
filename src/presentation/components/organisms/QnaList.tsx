// 📁 src/presentation/components/organisms/QnaList.tsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQnaViewModel } from '@/application/viewModels/QnaViewModel';

const ITEMS_PER_PAGE = 10;

export default function QnaList() {
  const { posts, loadAll, currentPage, setPage } = useQnaViewModel();

  useEffect(() => {
    loadAll();
  }, []);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const pagedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goFirst = () => setPage(1);
  const goLast = () => setPage(totalPages);
  const goPrev = () => currentPage > 1 && setPage(currentPage - 1);
  const goNext = () => currentPage < totalPages && setPage(currentPage + 1);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* 상단 제목 + 글쓰기 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">문의사항 게시판</h1>
        <Link
          to="/qna/write"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
        >
          글쓰기
        </Link>
      </div>

      {/* 게시글 리스트 */}
      <div className="space-y-4">
        {pagedPosts.length === 0 ? (
          <p className="text-gray-500">작성된 문의사항이 없습니다.</p>
        ) : (
          pagedPosts.map((post) => (
            <Link
              to={`/qna/${post.qnaPostNo}`}
              key={post.qnaPostNo}
              className="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="font-semibold text-lg text-gray-800">{post.title}</div>
              <div className="text-sm text-gray-500 mt-1">{post.createdAt}</div>
            </Link>
          ))
        )}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-6 space-x-1">
        {/* ≪ 첫 페이지 */}
        <button
          onClick={goFirst}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ≪
        </button>

        {/* ◀ 이전 */}
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ◀
        </button>

        {/* 페이지 번호 */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => setPage(pageNum)}
            className={`px-3 py-1 border rounded ${
              pageNum === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
            } hover:bg-blue-100`}
          >
            {pageNum}
          </button>
        ))}

        {/* ▶ 다음 */}
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ▶
        </button>

        {/* ≫ 마지막 페이지 */}
        <button
          onClick={goLast}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30"
        >
          ≫
        </button>
      </div>
    </div>
  );
}
