// 📁 /presentation/pages/AnalyticsShapPage.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { useShapEntireViewModel } from "@/application/viewModels/ShapViewModel";
import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
import { SideMenu } from "@/presentation/layout/SideMenu";
import { Header } from "@/presentation/layout/Header";
import { ShapPanel } from "@/presentation/components/organisms/ShapPanel";
import { ChartData } from "chart.js";

export default function AnalyticsShapPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const entire = useShapEntireViewModel();

  const dotChart: ChartData<"scatter", { x: number; y: number }[]> = {
    datasets: [
      {
        label: "SHAP Value",
        data: entire.shapDotChart.map((row, i) => ({
          x: parseFloat(row.shapValue),
          y: i,
        })),
        pointBackgroundColor: entire.shapDotChart.map((row) => row.colorValue),
      },
    ],
  };

  const barChart: ChartData<"bar", number[]> = {
    labels: entire.barChart.map((row) => row.feature),
    datasets: [
      {
        label: "SHAP Bar Plot",
        data: entire.barChart.map((row) => row.value),
        backgroundColor: "#000000",
      },
    ],
  };

  return (
    <div className="w-screen bg-primary text-gray-800">
      <Header />
      <main className="flex">
        <aside className="w-[240px] shrink-0 pt-4 pl-4">
          <SideMenu />
        </aside>

        <section className="flex-1 flex flex-col p-8">
          <div className="mb-4">
            <PageBreadcrumb title="Analysis / SHAP" />
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/analytics/shap/full")}
                className={`px-4 py-2 rounded ${
                  location.pathname === "/analytics/shap/full" ? "bg-white shadow" : "bg-gray-200"
                }`}
              >
                Entire User
              </button>
              <button
                onClick={() => navigate("/analytics/shap/filter")}
                className={`px-4 py-2 rounded ${
                  location.pathname === "/analytics/shap/filter" ? "bg-white shadow" : "bg-gray-200"
                }`}
              >
                User
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => console.log("데이터 내보내기")}
                className="bg-green-500 text-white px-4 py-2 rounded shadow"
              >
                데이터 내보내기
              </button>
            </div>
          </div>

            <ShapPanel
            dotChart={dotChart}
            barChart={barChart}
            isLoading={entire.isLoading}
            error={entire.error}
            summary={entire.summary} // ✅ 추가
            mode="entire"
            />
        </section>
      </main>
    </div>
  );
}
