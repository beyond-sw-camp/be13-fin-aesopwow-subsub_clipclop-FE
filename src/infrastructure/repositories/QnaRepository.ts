// 📁 repository/QnaRepository.ts
import { QnaApi } from "../api/QnaApi";

export const QnaRepository = {
  // 게시글 조회
  fetchPosts: QnaApi.getPosts,
  fetchPost: QnaApi.getPost,

  // 게시글 작성
  submitPost: QnaApi.createPost,

  // 관리자 댓글 관련
  fetchComment: QnaApi.getComment,
  submitComment: QnaApi.createComment,

// 게시글 삭제 (🆕 userNo 전달 추가)
deletePost: (id: number, userNo: number) =>
  QnaApi.deletePost(id, userNo),

  // 게시글 수정 (🆕 추가됨)
  updatePost: (
    id: number,
    data: { title: string; content: string; userNo: number }
  ) => QnaApi.updatePost(id, data),
};
