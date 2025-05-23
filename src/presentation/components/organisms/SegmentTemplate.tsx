type SegmentTemplateProps = {
    title: string;
    filter: React.ReactNode;
    onExport?: () => void;
    children: React.ReactNode;
};

export function SegmentTemplate({ title, filter, onExport, children }: SegmentTemplateProps) {
    return (
        <div className="p-6 flex flex-col space-y-4 w-full">
            <h1 className="text-xl font-bold text-white">Segments / {title}</h1>

            <div className="bg-white rounded shadow p-6 flex flex-nowrap">
                <div className="w-72 shrink-0 mr-6 mt-14">
    {filter}
</div>
                <div className="flex-1 space-y-4">
                    <div className="flex justify-end">
                        <button
                            onClick={onExport}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            데이터 내보내기
                        </button>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
