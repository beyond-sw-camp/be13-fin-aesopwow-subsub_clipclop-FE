// 📁 viewmodel/QnaViewModel.ts
import { getUser } from '@/application/stores/UserStore';
import { useQnaStore } from '@/application/stores/QnaStore';
import { QnaUsecase } from '../useCases/QnaUsecase';
import { useMemo } from 'react';

export const useQnaViewModel = () => {
  const store = useQnaStore();
  const qnaUsecase = useMemo(() => QnaUsecase, []);

  // 전체 게시글 불러오기
  const loadAll = async () => {
    const res = await QnaUsecase.loadPosts();
    const posts = (res.data as any).data;
    store.setPosts(posts);
  };

  // 단일 게시글 불러오기
  const loadOne = async (id: number) => {
    const res = await qnaUsecase.loadPost(id);
    store.setSelectedPost((res.data as any).data);
  };

  // 댓글 불러오기
  const loadComment = async (id: number) => {
    const res = await qnaUsecase.loadComment(id);
    store.setComment((res.data as any).data);
  };

  // 게시글 작성
  const writePost = async (title: string, content: string) => {
    const { userNo } = getUser();
    return await qnaUsecase.writePost(title, content, userNo);
  };

  // 관리자 댓글 작성
  const writeComment = async (id: number, content: string) => {
    const { userNo } = getUser();
    return await qnaUsecase.writeComment(id, content, userNo);
  };

// 게시글 삭제
const deletePost = async (id: number) => {
  const { userNo } = getUser(); // ✅ 현재 로그인 유저의 userNo
  return await qnaUsecase.deletePost(id, userNo);
};

  // 게시글 수정 (🆕 추가됨)
  const updatePost = async (id: number, title: string, content: string) => {
    const { userNo } = getUser();
    return await qnaUsecase.updatePost(id, title, content, userNo);
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
    writeComment,
    deletePost,
    updatePost, // ✅ 추가됨
  };
};
