// 📁 api/QnaApi.ts
import axiosInstance from './Axios';
import { QnaPost, QnaComment } from '@/core/model/QnaModel';

export const QnaApi = {
  getPosts: () => axiosInstance.get<QnaPost[]>('/qna'),
  getPost: (id: number) => axiosInstance.get<QnaPost>(`/qna/${id}`),
  createPost: (data: { title: string; content: string; userNo: number }) =>
    axiosInstance.post('/qna', data),
  getComment: (id: number) => axiosInstance.get<QnaComment>(`/qna/${id}/comment`),
  createComment: (id: number, data: { content: string; userNo: number }) =>
    axiosInstance.post(`/qna/${id}/comment`, data),
  updateComment: (id: number, data: { content: string; userNo: number }) =>
  axiosInstance.put(`/qna/${id}/comment`, data),
};
