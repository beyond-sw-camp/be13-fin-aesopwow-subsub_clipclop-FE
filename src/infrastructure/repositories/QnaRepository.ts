// 📁 repository/QnaRepository.ts
import { QnaApi } from "../api/QnaApi";

export const QnaRepository = {
  fetchPosts: QnaApi.getPosts,
  fetchPost: QnaApi.getPost,
  submitPost: QnaApi.createPost,
  fetchComment: QnaApi.getComment,
  submitComment: QnaApi.createComment,
};
