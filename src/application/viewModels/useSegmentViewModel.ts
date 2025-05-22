import { useEffect } from "react";
import { useSegmentStore } from "@/application/stores/SegmentStore";
import { SegmentUsecase } from "@/application/useCases/SegmentUsecase";

type FilterKey = "subscription" | "watchTime" | "age" | "country" | "lastLogin" | "genre";
type SegmentType = "subscription" | "watchTimeHour" | "genre" | "lastLogin";

function getDefaultFilters(segmentType: SegmentType): Record<FilterKey, boolean> {
    switch (segmentType) {
        case "subscription":
            return {
                subscription: true,
                watchTime: false,
                age: false,
                country: false,
                lastLogin: false,
                genre: false,
            };
        case "watchTimeHour":
            return {
                subscription: false,
                watchTime: true,
                age: false,
                country: false,
                lastLogin: false,
                genre: false,
            };
        case "genre":
            return {
                subscription: false,
                watchTime: false,
                age: false,
                country: false,
                lastLogin: false,
                genre: true,
            };
        case "lastLogin":
            return {
                subscription: false,
                watchTime: false,
                age: false,
                country: false,
                lastLogin: true,
                genre: false,
            };
        default:
            return {
                subscription: false,
                watchTime: false,
                age: false,
                country: false,
                lastLogin: false,
                genre: false,
            };
    }
}

export function useSegmentViewModel(segmentType: SegmentType) {
    const store = useSegmentStore();
    const usecase = new SegmentUsecase();

    useEffect(() => {
        store.setFilters(getDefaultFilters(segmentType));
        fetchSegmentData();
    }, [segmentType]);

    useEffect(() => {
        fetchSegmentData();
    }, [store.filters]);

    const fetchSegmentData = async () => {
        store.setLoading(true);
        try {
            const users = await usecase.fetchSegmentData(segmentType, store.filters);
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
