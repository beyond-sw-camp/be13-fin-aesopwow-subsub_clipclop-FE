// src/core/utils/sortUsersByKey.ts
import { User } from "@/mocks/mockSegmentUsers";

export function sortUsersByKey<K extends keyof User>(
    users: User[],
    sortKey: K | null,
    sortOrder: "asc" | "desc"
): User[] {
    if (!sortKey) return [...users];

    return [...users].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];

        if (typeof aVal === "number" && typeof bVal === "number") {
            return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
        }

        return sortOrder === "asc"
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
    });
}
