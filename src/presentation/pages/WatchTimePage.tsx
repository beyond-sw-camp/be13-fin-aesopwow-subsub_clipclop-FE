import { Header } from "@/presentation/layout/Header";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { SegmentTemplate } from "@/presentation/components/organisms/SegmentTemplate";
import { SegmentUserTable } from "@/presentation/components/organisms/SegmentUserTable";
import { SegmentFilterBox } from "@/presentation/components/molecules/SegmentFilterBox";
import { useSegmentViewModel } from "@/application/viewModels/SegmentViewModel";

export default function WatchTimePage() {
    const { filters, setFilters, users, isLoading, error } = useSegmentViewModel("watchTime");

    return (
        <div className="min-h-screen w-screen bg-primary text-gray-800">
            <Header />
            <main className="flex">
                <div className="pt-4 pl-4">
                    <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
                        <SideMenu />
                    </div>
                </div>

                <section className="flex-1 p-6 overflow-y-auto">
                    <SegmentTemplate
                        title="누적 시청시간"
                        filter={
                            <SegmentFilterBox
                                defaultFilters={{
                                    watchTime: true,
                                    age: false,
                                    country: false,
                                    lastLogin: false,
                                    subscription: false,
                                    genre: false,
                                }}
                                lockedKeys={["watchTime"]}
                                onChange={setFilters}
                            />
                        }
                    >
                        <div className="bg-white p-4 rounded shadow">
                            {isLoading && (
                                <div className="flex items-center justify-center p-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                                    <p className="ml-2 text-sm text-gray-500">불러오는 중...</p>
                                </div>
                            )}
                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
                                    <p className="text-sm font-medium">오류가 발생했습니다</p>
                                    <p className="text-xs">{error.message}</p>
                                </div>
                            )}
                            {!isLoading && !error && (
                                <SegmentUserTable users={users} />
                            )}
                        </div>
                    </SegmentTemplate>
                </section>
            </main>
        </div>
    );
}
