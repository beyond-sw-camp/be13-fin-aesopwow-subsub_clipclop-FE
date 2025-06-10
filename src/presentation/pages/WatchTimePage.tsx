import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SegmentFileListViewModel } from "@/application/viewModels/SegmentFileListViewModel";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { Header } from "@/presentation/layout/Header";
import { useUserStore } from "@/application/stores/UserStore";
import DotWaveLoader from "@/presentation/components/atoms/DotWaveLoader"

// 파일 정보 타입
export interface SegmentFileInfo {
  fileName: string;
  createdAt?: string;
}

const viewModel = new SegmentFileListViewModel();

export default function WatchTimePage() {
  const infoDbNo = useUserStore((state) => state.infoDbNo);
  const targetColumn = "watch_time";
  const [files, setFiles] = useState<SegmentFileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!infoDbNo) return;
    setLoading(true);

    viewModel.getFileList(infoDbNo, targetColumn)
      .then((res) => {
        let mapped: SegmentFileInfo[] = [];
        if (Array.isArray(res.files)) {
          if (typeof res.files[0] === "string") {
            mapped = (res.files as unknown as string[]).map((path) => ({
              fileName: path.split("/").pop() || path,
            }));
          } else if (typeof res.files[0] === "object" && res.files[0]?.fileName) {
            mapped = res.files as SegmentFileInfo[];
          }
        }
        setFiles(mapped);
      })
      .catch(() => setFiles([]))
      .finally(() => setLoading(false));
  }, [infoDbNo, targetColumn]);

  const handleRequestLatest = async () => {
    if (infoDbNo == null) {
      alert("필수 정보가 없습니다.");
      return;
    }
    setRequesting(true);
    try {
      await viewModel.requestLatestWatchTimeAnalysisGet({
        info_db_no: infoDbNo,
        user_info: "user_info",
        user_sub_info: "user_sub_info",
      });
      window.location.reload();
    } catch (e) {
      alert("최신 데이터 분석 요청에 실패했습니다.");
    } finally {
      setRequesting(false);
    }
  };

  // 파일명 클릭 시 분석결과 페이지로 이동 (path 파라미터로 s3Key 전달)
  const handleFileClick = (fileName: string) => {
    if (!infoDbNo || !fileName) return;
    const s3Key = `${infoDbNo}/segment/watch_time/${fileName}`;
    navigate(`/analysis/watchtime/${encodeURIComponent(s3Key)}`);
  };

  return (
    <div className="min-h-screen w-screen bg-[#FFA726] text-gray-800">
      <Header />
      <main className="flex">
        {/* 사이드 메뉴 */}
        <div className="w-64 pt-4 pl-4">
          <div className="mt-4 min-h-[calc(100vh-4rem)] flex flex-col justify-between">
            <SideMenu />
          </div>
        </div>
        {/* 메인 콘텐츠 */}
        <div className="flex-1 flex flex-col items-center">
          {/* 상단 탭 카드 - 좌측으로 220px 이동 */}
          <div
            className="w-[700px] bg-white rounded-lg shadow flex items-center justify-between px-8 py-6 mt-10 mb-8"
            style={{ marginLeft: '-220px' }}
          >
            <div className="flex flex-col items-center flex-1 cursor-pointer border-b-4 border-[#FFA726] pb-2">
              <span className="text-3xl mb-1 text-[#FFA726]">📋</span>
              <span className="text-[#FFA726] font-semibold text-lg">요청 내역 리스트</span>
            </div>
            <div className="flex flex-col items-center flex-1 cursor-pointer opacity-60 pb-2">
              <span className="text-3xl mb-1">📊</span>
              <span className="text-gray-400 font-semibold text-lg">분석 결과</span>
            </div>
          </div>
          {/* 리스트 카드 - 좌측으로 220px 이동 */}
          <div
            className="w-[525px] bg-white rounded-lg shadow p-6"
            style={{ marginLeft: '-220px' }}
          >
            <div className="font-bold text-base mb-4">요청 내역 리스트</div>
            <div className="border-b pb-2 font-semibold text-gray-700">요청 날짜</div>
            <button
              className="w-full bg-[#1976D2] text-white font-semibold rounded py-2 mt-4 mb-2 hover:bg-[#1565C0] transition"
              onClick={handleRequestLatest}
              disabled={requesting}
            >
              {requesting ? "요청 중..." : "최신 데이터로 분석 요청하기"}
            </button>
            {loading ? (
              <DotWaveLoader color="black" />
            ) : files.length === 0 ? (
              <div className="text-gray-400 text-center py-4">
                데이터가 없습니다.
              </div>
            ) : (
              <ul>
                {files.map((file) =>
                  file.fileName ? (
                    <li
                      key={file.fileName}
                      className="py-2 border-b last:border-b-0 flex items-center cursor-pointer hover:text-blue-600"
                      onClick={() => handleFileClick(file.fileName)}
                      title="클릭하면 분석 결과 페이지로 이동"
                    >
                      <div className="font-medium break-all">{file.fileName}</div>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
