import { SideMenuButton } from "@/presentation/components/atoms/SideMenuButton";
import { CustomButton } from "@/presentation/components/atoms/CustomButton";
import { useNavigate } from "react-router-dom";

export function SideMenu() {
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-white p-4 flex flex-col justify-between shadow-md rounded-lg">
      <div>
        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Home</h2>
          <SideMenuButton label="Dash Board" onClick={() => navigate("/dash-board")} />
        </div>

        <div className="border-t border-gray-300 my-4" />

        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Segments</h2>
          <SideMenuButton label="누적 시청시간" to="/segments/watchtime" />
          <SideMenuButton label="구독 유형" to="/segments/subscription" />
          <SideMenuButton label="선호 장르" to="/segments/genre" />
          <SideMenuButton label="마지막 접속일" to="/segments/lastlogin" />
        </div>

        <div className="border-t border-gray-300 my-4" />

        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">Cohorts</h2>
          <SideMenuButton label="단일 분석" onClick={() => navigate("/analytics/single/clusterselect")} />
          <SideMenuButton label="양측 비교" onClick={() => navigate("/analytics/double/clusterselect")} />
          <SideMenuButton label="추천 액션" to="/cohorts/recommendation" />
        </div>

        <div className="border-t border-gray-300 my-4" />

        <div className="mb-6">
          <h2 className="font-bold text-sm mb-2">문의 게시판</h2>
          <SideMenuButton label="문의 게시판" to="/qna" />
        </div>
      </div>

      <div className="border-t border-gray-300 my-4" />

      <div className="mt-4 bg-orange-500 p-3 rounded-md border border-gray-300">
        <h3 className="text-sm font-bold mb-2">Upgrade to PRO</h3>
        <p className="text-xs mb-3">
          Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features and premium.
        </p>
        <CustomButton
          title="Upgrade Now"
          loading={false}
          color="black"
          onClick={() => (window.location.href = "/membership")}
        />
      </div>
    </div>
  );
}