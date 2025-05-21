// /application/useCases/SegmentUsecase.ts

import { mockUsers } from "@/mocks/mockSegmentUsers";

export class SegmentUsecase {
    async fetchSegmentData(filterKey: string, filters: Record<string, boolean>) {
        await new Promise((res) => setTimeout(res, 300)); // 임시 로딩 시뮬레이션

        let result = mockUsers;

        // 1차 필터: 메인 필터 기준 필터링
        if (filterKey === "watchTime") {
            result = result.filter((user) => user.watchTimeHours > 50);
        } else if (filterKey === "subscription") {
            result = result.filter((user) => user.subscription === "Premium");
        } else if (filterKey === "genre") {
            result = result.filter((user) => user.favoriteGenre === "영화");
        } else if (filterKey === "lastLogin") {
            result = result.filter((user) => new Date(user.lastLogin) >= new Date("2024-04-22"));
        }

        // 2차 필터: 체크된 항목들 (임시)
        if (filters.age) {
            result = result.filter((user) => user.age >= 25);
        }
        if (filters.country) {
            result = result.filter((user) => user.country === "KR");
        }
        if (filters.subscription) {
            result = result.filter((user) => user.subscription === "Premium");
        }
        if (filters.genre) {
            result = result.filter((user) => user.favoriteGenre === "영화");
        }
        if (filters.lastLogin) {
            result = result.filter((user) => new Date(user.lastLogin) >= new Date("2024-04-25"));
        }

        return result;
    }
}
