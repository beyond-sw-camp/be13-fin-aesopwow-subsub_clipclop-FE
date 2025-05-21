import { CheckBox } from "@/presentation/components/atoms/CheckBox";
import { useState } from "react";

type FilterKey =
    | "age"
    | "country"
    | "subscription"
    | "watchTime"
    | "lastLogin"
    | "genre"
    | "powerUser"
    | "coreUser"
    | "lightUser";

const FILTER_LABELS: Record<FilterKey, string> = {
    age: "나이",
    country: "국가",
    subscription: "Subscription Type",
    watchTime: "Watch Time Hours",
    lastLogin: "마지막 접속일",
    genre: "선호 장르",
    powerUser: "Power User",
    coreUser: "Core User",
    lightUser: "Light User",
};

type Props = {
    defaultFilters?: Partial<Record<FilterKey, boolean>>;
    lockedKeys?: FilterKey[];
    onChange?: (filters: Record<FilterKey, boolean>) => void;
};

export function SegmentFilterBox({ 
    defaultFilters = {}, 
    lockedKeys = [],
    onChange 
    }: Props) {
    const group1: FilterKey[] = [
        "age",
        "country",
        "subscription",
        "watchTime",
        "lastLogin",
        "genre",
    ];
    const group2: FilterKey[] = ["powerUser", "coreUser", "lightUser"];

    const [filters, setFilters] = useState<Record<FilterKey, boolean>>(() => {
        const allKeys = [...group1, ...group2];
        return allKeys.reduce((acc, key) => {
            acc[key] = defaultFilters[key] ?? false;
            return acc;
        }, {} as Record<FilterKey, boolean>);
    });

    const isLocked = (key: FilterKey) => {
        return lockedKeys?.includes(key);
    };

    const handleChange = (key: FilterKey, checked: boolean) => {
        if (isLocked(key)) return;
        const next = { ...filters, [key]: checked };
        setFilters(next);
        onChange?.(next);
    };

    return (
        <div className="bg-white shadow p-4 rounded border border-gray-200 text-sm space-y-4 w-full">
        <div>
            <p className="font-semibold text-gray-800 mb-1">필터 선택</p>
            <div className="flex flex-col gap-1">
                {group1.map((key) => (
                    <CheckBox
                        key={key}
                        label={FILTER_LABELS[key]}
                        checked={filters[key]}
                        disabled={isLocked(key)}
                        onChange={(e) => handleChange(key, e.target.checked)}
                    />
                ))}
            </div>
        </div>

        <div>
            <p className="font-semibold text-gray-800 mb-1">Watch Time Hours</p>
            <div className="flex flex-col gap-1">
                {group2.map((key) => (
                    <CheckBox
                        key={key}
                        label={FILTER_LABELS[key]}
                        checked={filters[key]}
                        disabled={isLocked(key)}
                        onChange={(e) => handleChange(key, e.target.checked)}
                    />
                ))}
            </div>
            </div>
        </div>
    );
}
