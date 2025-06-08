// src/application/stores/QnaStore.ts
import { create } from 'zustand';
import { QnaPost, QnaComment } from '@/core/model/QnaModel';

interface QnaState {
  posts: QnaPost[];
  selectedPost: QnaPost | null;
  comment: QnaComment | null;
  currentPage: number;
  setPage: (page: number) => void;
  setPosts: (posts: QnaPost[]) => void;
  setSelectedPost: (post: QnaPost) => void;
  setComment: (comment: QnaComment) => void;
}

export const useQnaStore = create<QnaState>((set) => ({
  posts: [],
  selectedPost: null,
  comment: null,
  currentPage: 1,
  setPage: (page) => set({ currentPage: page }),
  setPosts: (posts) => set({ posts }),
  setSelectedPost: (post) => set({ selectedPost: post }),
  setComment: (comment) => set({ comment }),
}));