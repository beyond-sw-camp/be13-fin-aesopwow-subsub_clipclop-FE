import { Link } from "react-router-dom";

export function SideMenu() {
  return (
    <div className="w-60 bg-white p-4 flex flex-col justify-between shadow-md rounded-lg">
      <div>
        {/* Home */}
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Home</h2>
          <Link
            to="/dashboard"
            className="block w-full py-2 px-2 text-sm border border-gray-300 bg-gray-100 rounded-md font-bold text-black text-center hover:border-blue-400 hover:text-black"
          >
            Dash Board
          </Link>
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Segments */}
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Segments</h2>
          {["누적 시청시간", "구독 유형", "선호 장르", "마지막 접속일"].map((label, i) => (
            <button
              key={i}
              className="w-full py-2 px-2 text-sm border border-gray-300 bg-gray-100 rounded-md font-bold text-black text-center hover:border-blue-400 hover:text-black mb-2"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* Cohorts */}
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Cohorts</h2>
          {["단일 분석", "양측 비교"].map((label, i) => (
            <button
              key={i}
              className="w-full py-2 px-2 text-sm border border-gray-300 bg-gray-100 rounded-md font-bold text-black text-center hover:border-blue-400 hover:text-black mb-2"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="border-t border-gray-300 my-4"></div>

        {/* SHAP */}
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">SHAP</h2>
          <Link
            to="/analytics/shap"
            className="block w-full py-2 px-2 text-sm border border-gray-300 bg-gray-100 rounded-md font-bold text-black text-center hover:border-blue-400 hover:text-black"
          >
            SHAP 분석
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-300 my-4"></div>

      {/* Upgrade box */}
      <div className="mt-4 bg-orange-500 p-3 rounded-md border border-gray-300">
        <h3 className="text-sm font-bold mb-2">Upgrade to PRO</h3>
        <p className="text-xs mb-3">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features and premium.
        </p>
        <button className="bg-black text-white text-xs px-3 py-2 rounded hover:bg-gray-800">
          Upgrade Now
        </button>
      </div>
    </div>
  );
}