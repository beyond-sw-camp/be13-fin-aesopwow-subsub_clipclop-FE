// 📁 usecase/QnaUsecase.ts
import { QnaRepository } from "@/infrastructure/repositories/QnaRepository";

export const QnaUsecase = {
  loadPosts: () => QnaRepository.fetchPosts(),
  loadPost: (id: number) => QnaRepository.fetchPost(id),
  writePost: (title: string, content: string, userNo: number) =>
    QnaRepository.submitPost({ title, content, userNo }),
  loadComment: (id: number) => QnaRepository.fetchComment(id),
  writeComment: (id: number, content: string, userNo: number) =>
    QnaRepository.submitComment(id, { content, userNo }),
  updateComment: (id: number, content: string, userNo: number) =>
  QnaRepository.updateComment(id, { content, userNo }),
};
