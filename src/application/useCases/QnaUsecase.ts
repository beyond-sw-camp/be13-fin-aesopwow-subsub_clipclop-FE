// 📁 usecase/QnaUsecase.ts
import { QnaRepository } from "@/infrastructure/repositories/QnaRepository";

export const QnaUsecase = {
  loadPosts: () => QnaRepository.fetchPosts(),
  loadPost: (id: number) => QnaRepository.fetchPost(id),
  writePost: (title: string, content: string) =>
    QnaRepository.submitPost({ title, content }),
  loadComment: (id: number) => QnaRepository.fetchComment(id),
  writeComment: (id: number, content: string) =>
    QnaRepository.submitComment(id, content),
};
