// 📁 viewmodel/QnaViewModel.ts
import { useQnaStore } from '@/application/stores/QnaStore';
import { QnaUsecase } from '../useCases/QnaUsecase';
import { useMemo } from 'react';

export const useQnaViewModel = () => {
  const store = useQnaStore();
  const qnaUsecase = useMemo(() => QnaUsecase, []);

  // 문의글 전체 조회
  const loadAll = async () => {
    const res = await QnaUsecase.loadPosts();
    const posts = (res.data as any).data; // 응답에서 data 꺼내기
    store.setPosts(posts);
  };
  
  // 특정 문의글 조회
  const loadOne = async (id: number) => {
    const res = await qnaUsecase.loadPost(id);
    store.setSelectedPost(res.data);
  };

  // 관리자 답변 조회
  const loadComment = async (id: number) => {
    const res = await qnaUsecase.loadComment(id);
    store.setComment(res.data);
  };

  // 문의글 작성
  const writePost = async (title: string, content: string) => {
    return await qnaUsecase.writePost(title, content);
  };

  // 관리자 답변 작성
  const writeComment = async (id: number, content: string) => {
    return await qnaUsecase.writeComment(id, content);
  };

  return {
    posts: store.posts,
      currentPage: store.currentPage,
    setPage: store.setPage,
    selectedPost: store.selectedPost,
    comment: store.comment,
    loadAll,
    loadOne,
    loadComment,
    writePost,
    writeComment, // ✅ 추가됨
  };
};