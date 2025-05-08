import { useState, useEffect } from "react";
import {
    fetchCohortBehaviorPattern,
    fetchCohortInsight,
    fetchCohortRemainHeatmap,
} from "@/application/useCases/CohortUsecase";

// MARK: - BehaviorPattern 
export function useCohortBehaviorPatternViewModel() {
    const [data, setData] = useState<{ title: string; content: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchCohortBehaviorPattern();
                setData(result);
            } catch {
                setError("데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}

// MARK: - Insight
export function useCohortInsightViewModel() {
    const [data, setData] = useState<{ title: string; content: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchCohortInsight();
                setData(result);
            } catch {
                setError("인사이트 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}

// MARK: - RemainHeatmap
export function useCohortRemainHeatmapViewModel() {
    const [data, setData] = useState<{
        title: string;
        content: string;
        heatmapImageBase64: string;
    } | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchCohortRemainHeatmap();
                setData(result);
            } catch {
                setError("잔존율 히트맵 데이터를 불러오는 데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
}
