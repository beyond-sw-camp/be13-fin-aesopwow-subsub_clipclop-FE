import logo from "@/assets/logo.png";
import { Header } from "@/presentation/layout/Header";

export default function WelcomePage() {
  return (
    <div className="min-h-screen w-screen bg-primary text-gray-800">
      <Header />

      <main className="flex items-center justify-center h-[calc(100vh-4rem)] px-8">
        {/* 왼쪽 이미지 */}
        <div className="w-1/2 flex justify-center">
          <img src={logo} alt="다구독 다구독 로고" className="max-w-[300px] w-full" />
        </div>

        {/* 오른쪽 텍스트 */}
        <div className="w-1/2">
          <p className="text-3xl font-bold leading-relaxed">
            트렌드 분석 및 세분화된 <br />
            그룹 분석을 통해 <br />
            비즈니스 인사이트 제공
          </p>
        </div>
      </main>
    </div>
  );
}