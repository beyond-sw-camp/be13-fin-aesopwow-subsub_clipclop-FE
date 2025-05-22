import { useEffect, useMemo, useCallback, useRef } from "react";
import { useSegmentStore } from "@/application/stores/SegmentStore";
import { SegmentUsecase } from "@/application/useCases/SegmentUsecase";
import { FilterKey, SegmentType } from "@/presentation/components/molecules/SegmentFilterBox";

function getDefaultFilters(segmentType: SegmentType): Record<FilterKey, boolean> {
    return {
        subscription: segmentType === "subscription",
        watchTime: segmentType === "watchTimeHour",
        genre: segmentType === "genre",
        lastLogin: segmentType === "lastLogin",
        age: false,
        country: false,
    };
}

function mapSegmentTypeToFilterKey(segmentType: SegmentType): FilterKey {
    switch (segmentType) {
        case "watchTimeHour":
            return "watchTime";
        case "subscription":
            return "subscription";
        case "genre":
            return "genre";
        case "lastLogin":
            return "lastLogin";
        default:
            return "subscription";
    }
}

export function useSegmentViewModel(segmentType: SegmentType) {
    const store = useSegmentStore();
    const usecase = useMemo(() => new SegmentUsecase(), []);

    const isInitialized = useRef(false);

    const fetchSegmentData = useCallback(async () => {
        store.setLoading(true);
        try {
            const filterKey = mapSegmentTypeToFilterKey(segmentType);
            const users = await usecase.fetchSegmentData(filterKey, store.filters);
            store.setUsers(users);
        } catch (err) {
            store.setError(err instanceof Error ? err : new Error("오류 발생"));
        } finally {
            store.setLoading(false);
        }
    }, [segmentType, store.filters, usecase]);

    useEffect(() => {
        if (!isInitialized.current) {
            store.setFilters(getDefaultFilters(segmentType));
            isInitialized.current = true;
        }
    }, [segmentType, store]);

    useEffect(() => {
        fetchSegmentData();
    }, [store.filters, fetchSegmentData]);

    return {
        filters: store.filters,
        setFilters: store.setFilters,
        users: store.users,
        isLoading: store.isLoading,
        error: store.error,
    };
}
