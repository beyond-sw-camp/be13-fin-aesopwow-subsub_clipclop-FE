// /application/stores/SegmentStore.ts

import { create } from 'zustand';

interface SegmentStoreState {
    filters: Record<string, boolean>;
    users: any[];
    isLoading: boolean;
    error: Error | null;
    setFilters: (filters: Record<string, boolean>) => void;
    setUsers: (users: any[]) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: Error | null) => void;
}

export const useSegmentStore = create<SegmentStoreState>((set) => ({
    filters: {},
    users: [],
    isLoading: false,
    error: null,
    setFilters: (filters) => set({ filters }),
    setUsers: (users) => set({ users }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
}));
