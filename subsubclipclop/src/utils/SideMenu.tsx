// /utils/SideMenu.tsx
import { Link } from "react-router-dom";

export function SideMenu() {
  return (
    <div className="w-60 bg-white p-4 flex flex-col justify-between shadow-md rounded-b-lg">
      <div>
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Home</h2>
          <Link to="/dashboard" className="block w-full py-1 px-2 text-sm bg-gray-100 rounded-md">
            Dash Board
          </Link>
        </div>
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Analytics</h2>
          <Link to="/analytics/cohorts" className="block w-full py-1 px-2 text-sm bg-orange-400 text-white rounded-md mb-1">
            코호트 분석
          </Link>
          <Link to="/analytics/shap" className="block w-full py-1 px-2 text-sm bg-gray-100 rounded-md">
            SHAP 분석
          </Link>
        </div>
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Administration</h2>
          <div className="space-y-1">
            {["고객 관리", "구독 관리", "결제 관리", "문의 관리"].map((label, i) => (
              <button key={i} className="w-full py-1 px-2 text-sm bg-gray-100 rounded-md">
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 bg-orange-200 p-3 rounded-md">
        <h3 className="text-sm font-bold mb-1">Upgrade to PRO</h3>
        <p className="text-xs mb-2">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features and premium.
        </p>
        <button className="bg-black text-white text-xs px-2 py-1 rounded">Upgrade Now</button>
      </div>
    </div>
  );
}
