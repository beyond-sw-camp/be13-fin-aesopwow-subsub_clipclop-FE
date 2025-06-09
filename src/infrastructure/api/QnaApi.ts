// api/QnaApi.ts
import axiosInstance from './Axios';
import { QnaPost, QnaComment } from '@/core/model/QnaModel';

export const QnaApi = {
  // 게시글 조회
  getPosts: (page = 0, size = 1000) => axiosInstance.get(`/qna?page=${page}&size=${size}`),
  getPost: (id: number) => axiosInstance.get<QnaPost>(`/qna/${id}`),

  // 게시글 작성
  createPost: (data: { title: string; content: string; userNo: number }) =>
    axiosInstance.post('/qna', data),

  // 댓글 조회
  getComment: (id: number) => axiosInstance.get<QnaComment>(`/qna/${id}/comment`),

  // 댓글 작성
  createComment: (id: number, data: { content: string; userNo: number }) =>
    axiosInstance.post(`/qna/${id}/comment`, data),

  // 게시글 삭제 (🆕 userNo 쿼리 파라미터 추가)
  deletePost: (id: number, userNo: number) =>
    axiosInstance.delete(`/qna/${id}`, {
      params: { userNo },
    }),

  // 게시글 수정 (🆕 추가됨)
  updatePost: (
    id: number,
    data: { title: string; content: string; userNo: number }
  ) => axiosInstance.put(`/qna/${id}`, data),
};
