export interface User {
    userId: number;
    name: string;
    age: number;
    country: string;
    watchTimeHours: number;
    favoriteGenre: string;
    lastLogin: string;
    subscription: "Basic" | "Premium" | "Ultimate";
}

export const mockUsers: User[] = [
    { userId: 101, name: "김영희", age: 34, country: "KR", watchTimeHours: 55, favoriteGenre: "다큐", lastLogin: "2024-04-22", subscription: "Basic" },
    { userId: 102, name: "최은지", age: 22, country: "KR", watchTimeHours: 42, favoriteGenre: "영화", lastLogin: "2024-04-21", subscription: "Basic" },
    { userId: 103, name: "박영호", age: 28, country: "KR", watchTimeHours: 30, favoriteGenre: "드라마", lastLogin: "2024-04-19", subscription: "Basic" },
    { userId: 104, name: "장수진", age: 26, country: "KR", watchTimeHours: 25, favoriteGenre: "영화", lastLogin: "2024-04-18", subscription: "Basic" },
    { userId: 105, name: "Daniel", age: 29, country: "US", watchTimeHours: 95, favoriteGenre: "예능", lastLogin: "2024-04-26", subscription: "Premium" },
    { userId: 106, name: "김철수", age: 25, country: "KR", watchTimeHours: 80, favoriteGenre: "영화", lastLogin: "2024-04-25", subscription: "Premium" },
    { userId: 107, name: "Emily", age: 31, country: "US", watchTimeHours: 65, favoriteGenre: "드라마", lastLogin: "2024-04-23", subscription: "Premium" },
    { userId: 108, name: "이민수", age: 38, country: "KR", watchTimeHours: 38, favoriteGenre: "예능", lastLogin: "2024-04-20", subscription: "Premium" },
    { userId: 109, name: "오세진", age: 32, country: "KR", watchTimeHours: 120, favoriteGenre: "영화", lastLogin: "2024-04-27", subscription: "Ultimate" },
    { userId: 110, name: "Brian", age: 45, country: "US", watchTimeHours: 125, favoriteGenre: "다큐", lastLogin: "2024-04-17", subscription: "Ultimate" },
    { userId: 111, name: "이하늘", age: 32, country: "KR", watchTimeHours: 71, favoriteGenre: "예능", lastLogin: "2024-04-27", subscription: "Premium" },
    { userId: 112, name: "강민지", age: 30, country: "KR", watchTimeHours: 61, favoriteGenre: "드라마", lastLogin: "2024-04-27", subscription: "Premium" },
    { userId: 113, name: "한서준", age: 20, country: "KR", watchTimeHours: 127, favoriteGenre: "영화", lastLogin: "2024-04-25", subscription: "Premium" },
    { userId: 114, name: "이해인", age: 40, country: "KR", watchTimeHours: 122, favoriteGenre: "다큐", lastLogin: "2024-04-26", subscription: "Basic" },
    { userId: 115, name: "Grace", age: 35, country: "US", watchTimeHours: 27, favoriteGenre: "드라마", lastLogin: "2024-04-20", subscription: "Premium" },
    { userId: 116, name: "서진우", age: 35, country: "KR", watchTimeHours: 38, favoriteGenre: "다큐", lastLogin: "2024-04-21", subscription: "Premium" },
    { userId: 117, name: "James", age: 44, country: "US", watchTimeHours: 86, favoriteGenre: "드라마", lastLogin: "2024-04-23", subscription: "Basic" },
    { userId: 118, name: "정다은", age: 33, country: "KR", watchTimeHours: 32, favoriteGenre: "예능", lastLogin: "2024-04-25", subscription: "Premium" },
    { userId: 119, name: "박준호", age: 29, country: "KR", watchTimeHours: 128, favoriteGenre: "영화", lastLogin: "2024-04-25", subscription: "Ultimate" },
    { userId: 120, name: "Natalie", age: 32, country: "US", watchTimeHours: 95, favoriteGenre: "드라마", lastLogin: "2024-04-24", subscription: "Basic" }
];