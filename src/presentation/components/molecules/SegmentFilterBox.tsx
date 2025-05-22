import { CheckBox } from "@/presentation/components/atoms/CheckBox";
import { useState } from "react";

export type FilterKey =
    | "age"
    | "country"
    | "subscription"
    | "watchTime"
    | "lastLogin"
    | "genre";

export type WatchTimeExtraFilterKey =
    | "powerUser"
    | "coreUser"
    | "lightUser";

export type SegmentType =
    | "watchTimeHour"
    | "subscription"
    | "genre"
    | "lastLogin";

const FILTER_LABELS: Record<FilterKey, string> = {
    age: "나이",
    country: "국가",
    subscription: "Subscription Type",
    watchTime: "Watch Time Hours",
    lastLogin: "마지막 접속일",
    genre: "선호 장르",
};

interface Props {
    segmentType: SegmentType;
    defaultFilters: Record<FilterKey, boolean>;
    lockedKeys?: FilterKey[];
    onChange?: (updated: Record<FilterKey, boolean>) => void;
    onSortChange?: (key: "age" | "country") => void;
    sortKey?: "age" | "country" | null;
    sortOrder?: "asc" | "desc";
}

export function SegmentFilterBox({
    segmentType,
    defaultFilters,
    lockedKeys = [],
    onChange,
    onSortChange,
    sortKey,
    sortOrder,
}: Props) {
    const group1: FilterKey[] = [
        "age",
        "country",
        "subscription",
        "watchTime",
        "lastLogin",
        "genre",
    ];

    const [filters, setFilters] = useState<Record<FilterKey, boolean>>(defaultFilters);

    const [subscriptionOptions, setSubscriptionOptions] = useState<Record<string, boolean>>({
        Basic: true,
        Premium: true,
        Ultimate: true,
    });

    const [genreOptions, setGenreOptions] = useState<Record<string, boolean>>({
        Action: true,
        Comedy: true,
        Documentary: true,
        Drama: true,
        Horror: true,
        Romance: true,
        "Sci-Fi": true,
    });

    const [lastLoginOptions, setLastLoginOptions] = useState<Record<string, boolean>>({
        Active: true,
        Dormant: true,
        InActive: true,
    });

    const isLocked = (key: FilterKey) => lockedKeys.includes(key);

    const handleChange = (key: FilterKey, checked: boolean) => {
        if (isLocked(key)) return;
        const next = { ...filters, [key]: checked };
        setFilters(next);
        onChange?.(next);
    };

    const renderSortLabel = (key: "age" | "country", label: string) => {
        const icon = sortKey !== key ? "⇅" : sortOrder === "asc" ? "↑" : "↓";
        return (
            <button
                type="button"
                className="flex items-center gap-1 text-sm text-gray-800 hover:underline focus:outline-none"
                onClick={() => onSortChange?.(key)}
            >
                <span className="text-sm">{icon}</span>
                <span className="text-sm">{label}</span>
            </button>
        );
    };

    return (
        <div className="bg-white shadow p-5 rounded border border-gray-200 text-sm w-64 space-y-6">
            <div>
                <p className="font-semibold text-gray-800 mb-2 text-base">내림차순 유/무</p>
                <div className="flex flex-col gap-2">
                    {renderSortLabel("age", "나이")}
                    {renderSortLabel("country", "국가")}
                </div>
            </div>

            <div>
                <p className="font-semibold text-gray-800 mb-2 text-base">필터 추가</p>
                <div className="flex flex-col gap-2">
                    {group1.slice(2).map((key) => (
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

            {(segmentType === "watchTimeHour" && filters.watchTime) && (
                <div>
                    <p className="font-semibold text-gray-800 mb-2 text-base">Watch Time Hours</p>
                    <div className="flex flex-col gap-2 ml-2">
                        {["powerUser", "coreUser", "lightUser"].map((key) => (
                            <CheckBox
                                key={key}
                                label={key}
                                checked={false}
                                onChange={() => {}}
                            />
                        ))}
                    </div>
                </div>
            )}

            {(segmentType === "subscription" && filters.subscription) && (
                <div>
                    <p className="font-semibold text-gray-800 mb-2 text-base">Subscription Type</p>
                    <div className="flex flex-col gap-2 ml-2">
                        {Object.entries(subscriptionOptions).map(([label, checked]) => (
                            <CheckBox
                                key={label}
                                label={label}
                                checked={checked}
                                onChange={(e) =>
                                    setSubscriptionOptions({
                                        ...subscriptionOptions,
                                        [label]: e.target.checked,
                                    })
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {(segmentType === "genre" && filters.genre) && (
                <div>
                    <p className="font-semibold text-gray-800 mb-2 text-base">Genre</p>
                    <div className="flex flex-col gap-2 ml-2">
                        {Object.entries(genreOptions).map(([label, checked]) => (
                            <CheckBox
                                key={label}
                                label={label}
                                checked={checked}
                                onChange={(e) =>
                                    setGenreOptions({
                                        ...genreOptions,
                                        [label]: e.target.checked,
                                    })
                                }
                            />
                        ))}
                    </div>
                </div>
            )}

            {(segmentType === "lastLogin" && filters.lastLogin) && (
                <div>
                    <p className="font-semibold text-gray-800 mb-2 text-base">마지막 접속일</p>
                    <div className="flex flex-col gap-2 ml-2">
                        {Object.entries(lastLoginOptions).map(([label, checked]) => (
                            <CheckBox
                                key={label}
                                label={label}
                                checked={checked}
                                onChange={(e) =>
                                    setLastLoginOptions({
                                        ...lastLoginOptions,
                                        [label]: e.target.checked,
                                    })
                                }
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
