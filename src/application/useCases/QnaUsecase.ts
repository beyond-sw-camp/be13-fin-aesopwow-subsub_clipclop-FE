// usecase/QnaUsecase.ts
import { QnaRepository } from "@/infrastructure/repositories/QnaRepository";

export const QnaUsecase = {
  // 게시글 전체 조회
  loadPosts: () => QnaRepository.fetchPosts(0, 1000),

  // 게시글 단일 조회
  loadPost: (id: number) => QnaRepository.fetchPost(id),

  // 게시글 작성
  writePost: (title: string, content: string, userNo: number) =>
    QnaRepository.submitPost({ title, content, userNo }),

  // 관리자 댓글 조회
  loadComment: (id: number) => QnaRepository.fetchComment(id),

  // 관리자 댓글 작성
  writeComment: (id: number, content: string, userNo: number) =>
    QnaRepository.submitComment(id, { content, userNo }),

// 게시글 삭제 (🆕 userNo 전달)
deletePost: (id: number, userNo: number) =>
  QnaRepository.deletePost(id, userNo),

  // 게시글 수정 (🆕 추가됨)
  updatePost: (id: number, title: string, content: string, userNo: number) =>
    QnaRepository.updatePost(id, { title, content, userNo }),
};
