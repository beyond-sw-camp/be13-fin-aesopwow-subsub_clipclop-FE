// /application/viewModels/SegmentViewModel.ts

import { useEffect } from "react";
import { useSegmentStore } from "@/application/stores/SegmentStore";
import { SegmentUsecase } from "@/application/useCases/SegmentUsecase";

export function useSegmentViewModel(filterKey: string) {
    const store = useSegmentStore();
    const usecase = new SegmentUsecase();

    useEffect(() => {
        fetchSegmentData();
    }, [filterKey, store.filters]);

    const fetchSegmentData = async () => {
        store.setLoading(true);
        try {
            const users = await usecase.fetchSegmentData(filterKey, store.filters);
            store.setUsers(users);
        } catch (err) {
            store.setError(err instanceof Error ? err : new Error("오류 발생"));
        } finally {
            store.setLoading(false);
        }
    };

    return {
        filters: store.filters,
        setFilters: store.setFilters,
        users: store.users,
        isLoading: store.isLoading,
        error: store.error,
    };
}
