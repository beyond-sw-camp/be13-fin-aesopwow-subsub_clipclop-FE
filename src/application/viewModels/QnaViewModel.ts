// viewmodel/QnaViewModel.ts
import { getUser } from '@/application/stores/UserStore';
import { useQnaStore } from '@/application/stores/QnaStore';
import { QnaUsecase } from '../useCases/QnaUsecase';
import { useMemo } from 'react';

export const useQnaViewModel = () => {
  const store = useQnaStore();
  const qnaUsecase = useMemo(() => QnaUsecase, []);

  const getUserNoOrThrow = async (): Promise<number> => {
    const user = await getUser(); // await 필요
    console.log("QnA 요청 시점의 사용자 상태:", user);
    if (!user.userNo) throw new Error("로그인된 사용자 정보가 없습니다.");
    return user.userNo;
  };

  const loadAll = async () => {
    const res = await qnaUsecase.loadPosts();
    const posts = (res.data as any).data;
    store.setPosts(posts);
  };

  const loadOne = async (id: number) => {
    const res = await qnaUsecase.loadPost(id);
    store.setSelectedPost((res.data as any).data);
  };

  const loadComment = async (id: number) => {
    const res = await qnaUsecase.loadComment(id);
    store.setComment((res.data as any).data);
  };

  const writePost = async (title: string, content: string) => {
    const userNo = await getUserNoOrThrow();
    return await qnaUsecase.writePost(title, content, userNo);
  };

  const writeComment = async (id: number, content: string) => {
    const userNo = await getUserNoOrThrow();
    return await qnaUsecase.writeComment(id, content, userNo);
  };

  const deletePost = async (id: number) => {
    const userNo = await getUserNoOrThrow();
    return await qnaUsecase.deletePost(id, userNo);
  };

  const updatePost = async (id: number, title: string, content: string) => {
    const userNo = await getUserNoOrThrow();
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
    updatePost,
  };
};