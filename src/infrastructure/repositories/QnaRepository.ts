// 📁 repository/QnaRepository.ts
import { QnaApi } from "../api/QnaApi";

export const QnaRepository = {
  fetchPosts: QnaApi.getPosts,
  fetchPost: QnaApi.getPost,
  submitPost: QnaApi.createPost,
  fetchComment: QnaApi.getComment,
  submitComment: QnaApi.createComment,
  updateComment: (
    id: number,
    data: { content: string; userNo: number }
  ) => QnaApi.updateComment(id, data),
};