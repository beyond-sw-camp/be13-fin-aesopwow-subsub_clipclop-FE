import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { SegmentFileListViewModel } from "@/application/viewModels/SegmentFileListViewModel";

export default function AnalysisSubscriptionPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const infoDbNo = params.get("infoDbNo");
  const s3Key = params.get("s3Key");
  const fileName = params.get("fileName");
  const [csvData, setCsvData] = useState<string | null>(null);

  useEffect(() => {
    if (!s3Key) return;
    const viewModel = new SegmentFileListViewModel();
    viewModel.downloadFile(s3Key)
      .then((res) => {
        const reader = new FileReader();
        reader.onload = () => {
          setCsvData(reader.result as string);
        };
        reader.readAsText(res.data);
      })
      .catch(() => setCsvData("분석 데이터 로드 실패"));
  }, [s3Key]);

  return (
    <div>
      <h1>분석 결과: {fileName}</h1>
      <pre style={{ whiteSpace: "pre-wrap" }}>{csvData || "로딩 중..."}</pre>
    </div>
  );
}
