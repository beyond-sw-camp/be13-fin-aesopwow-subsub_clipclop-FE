// // 📁 /presentation/pages/AnalyticsShapFilterPage.tsx
// import { useNavigate, useLocation } from "react-router-dom";
// import { useState, useMemo } from "react";
// import { useShapFilteredViewModel } from "@/application/viewModels/ShapViewModel";
// import { PageBreadcrumb } from "@/presentation/components/molecules/PageBreadcrumb";
// import { SideMenu } from "@/presentation/layout/SideMenu";
// import { Header } from "@/presentation/layout/Header";
// import { ShapPanel } from "@/presentation/components/organisms/ShapPanel";
// import { ChartData } from "chart.js";
// import { ShapSidebar } from "../components/organisms/ShapSidebar";

// export default function AnalyticsShapFilterPage() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ✅ Sidebar 바인딩용 상태
//   const [keywords, setKeywords] = useState<string[]>(["Spring", "Smart", "Modern"]);
//   const [filters, setFilters] = useState<Record<string, any>>({});

//   const keywordString = useMemo(() => keywords.join(","), [keywords]);
//   const filtered = useShapFilteredViewModel(keywordString, filters);

//   const dotChart: ChartData<"scatter", { x: number; y: number }[]> = {
//     datasets: [
//       {
//         label: "SHAP Value",
//         data: filtered.shapDotChart.map((row, i) => ({
//           x: parseFloat(row.shapValue),
//           y: i,
//         })),
//         pointBackgroundColor: filtered.shapDotChart.map((row) => row.colorValue),
//       },
//     ],
//   };

//   const barChart: ChartData<"bar", number[]> = {
//     labels: filtered.barChart.map((row) => row.feature),
//     datasets: [
//       {
//         label: "SHAP Bar Plot",
//         data: filtered.barChart.map((row) => row.value),
//         backgroundColor: "#000000",
//       },
//     ],
//   };

//   return (
//     <div className="w-screen bg-primary text-gray-800">
//       <Header />
//       <main className="flex">
//         <aside className="w-[240px] shrink-0 pt-4 pl-4">
//           <SideMenu isLoggedIn={true}/>
//         </aside>

//         <section className="flex-1 flex flex-col p-8">
//           <div className="mb-4">
//             <PageBreadcrumb title="Analysis / SHAP (Filter)" />
//           </div>

//           <div className="flex justify-between items-center mb-6">
//             <div className="flex gap-4">
//               <button
//                 onClick={() => navigate("/analytics/shap/full")}
//                 className={`px-4 py-2 rounded ${
//                   location.pathname === "/analytics/shap/full"
//                     ? "bg-white shadow"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 Entire User
//               </button>
//               <button
//                 onClick={() => navigate("/analytics/shap/filter")}
//                 className={`px-4 py-2 rounded ${
//                   location.pathname === "/analytics/shap/filter"
//                     ? "bg-white shadow"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 User
//               </button>
//             </div>

//             <div className="flex gap-2">
//               <button
//                 onClick={() => console.log("데이터 내보내기")}
//                 className="bg-green-500 text-white px-4 py-2 rounded shadow"
//               >
//                 데이터 내보내기
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-8">
//             <ShapSidebar
//               onChange={(newKeywords, newFilters) => {
//                 setKeywords(newKeywords);
//                 setFilters(newFilters);
//               }}
//             />
//             <ShapPanel
//               dotChart={dotChart}
//               barChart={barChart}
//               isLoading={filtered.isLoading}
//               error={filtered.error}
//               summary={filtered.summary}
//               mode="user"
//             />
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
