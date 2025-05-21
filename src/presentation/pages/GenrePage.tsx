import { Header } from "@/presentation/layout/Header";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { SegmentTemplate } from "@/presentation/components/organisms/SegmentTemplate";
import { SegmentUserTable } from "@/presentation/components/organisms/SegmentUserTable";
import { SegmentFilterBox } from "@/presentation/components/molecules/SegmentFilterBox";
import { useSegmentViewModel } from "@/application/viewModels/SegmentViewModel";

export default function GenrePage() {
    const { filters, setFilters, users, isLoading, error } = useSegmentViewModel("genre");

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
                                    watchTime: false,
                                    age: false,
                                    country: false,
                                    lastLogin: false,
                                    subscription: false,
                                    genre: true,
                                }}
                                lockedKeys={["genre"]}
                                onChange={setFilters}
                            />
                        }
                    >
                        <div className="bg-white p-4 rounded shadow">
                            {isLoading && <p className="text-sm text-gray-500">불러오는 중...</p>}
                            {error && <p className="text-sm text-red-500">오류: {error.message}</p>}
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
