// /core/model/UserDataModel.ts

// MARK: - 유저 데이터 검색 타입
export interface User {
    userId: number;
    name: string;
    age: number;
    country: string;
    subscription: "Basic" | "Premium" | "Ultimate";
    watchTimeHours: number;
    favoriteGenre: string;
    lastLogin: string;
}