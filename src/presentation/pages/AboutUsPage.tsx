import { Header } from "../layout/Header";
import logo from "@/assets/logo.png";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen w-screen bg-[#f7931a] text-gray-800 flex flex-col">
            <Header />
            <main className="flex flex-1 items-center justify-center px-8 py-16">
                <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl">
                    {/* 왼쪽: 로고 + 이미지 */}
                    <div className="flex flex-col items-center justify-center md:items-end md:justify-center md:pr-12">
                        <img
                            src={logo}
                            alt="Mascot"
                            className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] object-contain"
                        />
                    </div>

                    {/* 오른쪽: 텍스트 */}
                    <div className="text-center md:text-left md:pl-12 mt-10 md:mt-0">
                        <h1 className="text-2xl md:text-5xl font-bold leading-snug">
                            트렌드 분석 및 <br />
                            세분화된 그룹 분석을 통해 <br />
                            비즈니스 인사이트 제공
                        </h1>
                    </div>
                </div>
            </main>
        </div>
    );
}