// /application/useCases/SegmentUsecase.ts

import { mockUsers } from "@/mocks/mockSegmentUsers";

const FILTER_CRITERIA = {
    watchTime: 50, // 시간
    premiumSubscription: "Premium",
    favoriteGenre: "영화",
    recentLoginDate: "2024-04-22",
};

export class SegmentUsecase {
    async fetchSegmentData(filterKey: string, filters: Record<string, boolean>) {
        try {
            await new Promise((res) => setTimeout(res, 300)); // 임시 로딩 시뮬레이션

            let result = mockUsers;

            // 1차 필터: 메인 필터 기준
            if (filterKey === "watchTime") {
                result = result.filter((user) => user.watchTimeHours > FILTER_CRITERIA.watchTime);
            } else if (filterKey === "subscription") {
                result = result.filter((user) => user.subscription === FILTER_CRITERIA.premiumSubscription);
            } else if (filterKey === "genre") {
                result = result.filter((user) => user.favoriteGenre === FILTER_CRITERIA.favoriteGenre);
            } else if (filterKey === "lastLogin") {
                result = result.filter(
                    (user) => new Date(user.lastLogin) >= new Date(FILTER_CRITERIA.recentLoginDate)
                );
            }

            // 2차 필터: 체크된 항목 기준
            if (filters.age) {
                result = result.filter((user) => user.age >= 25);
            }
            if (filters.country) {
                result = result.filter((user) => user.country === "KR");
            }
            if (filters.subscription) {
                result = result.filter((user) => user.subscription === FILTER_CRITERIA.premiumSubscription);
            }
            if (filters.genre) {
                result = result.filter((user) => user.favoriteGenre === FILTER_CRITERIA.favoriteGenre);
            }
            if (filters.lastLogin) {
                result = result.filter((user) => new Date(user.lastLogin) >= new Date("2024-04-25"));
            }

            return result;
        } catch (error) {
            console.error("세그먼트 데이터 가져오기 오류:", error);
            throw new Error("세그먼트 데이터를 가져오는 중 오류가 발생했습니다.");
        }
    }
}
