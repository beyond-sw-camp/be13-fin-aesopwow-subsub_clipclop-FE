import { Header } from "../layout/Header";
import aboutus from "@/assets/6592321.jpg";
import vision from "@/assets/vision.jpg";
import wevision from "@/assets/wevision.jpg";
import lockin from "@/assets/lockin.png";
import analytics from "@/assets/ana.jpg";
import care from "@/assets/care.jpg";
import visionkey from "@/assets/visionkey.png";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen w-full bg-primary flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex flex-col items-center justify-center px-4 py-16 space-y-32">

        <section className="flex flex-col md:flex-row max-w-screen-xl w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">
          <span className="text-red-700">CICD 테스트 성공!!</span><br />
              황금알을 낳는 고객을 위한, <br /><span className="text-brown-700">다구독 다구독 
                </span>
            </h2>
            <p className="text-lg leading-relaxed">
              <br /><br />고객은 단순한 수익원이 아닌, 장기적인 가치를 창출하는 <br /><strong>황금알을 낳는 거위</strong>입니다.<br />
              <br />
              다구독 다구독은 고객 이탈을 최소화하고, <br />기존 구독자를 세심하게 관리함으로써<br />
              <strong>지속가능한 수익과 고객 락인(Lock-in)</strong>을 실현하는 <br />B2B 구독 관리 플랫폼입니다.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={aboutus} alt="about" className="object-cover w-full h-full" />
          </div>
        </section>

        <section className="flex flex-col md:flex-row-reverse max-w-screen-xl w-full bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Mission</h2><br />
            <p className="text-lg leading-relaxed">
              다구독 다구독은 고객을 단순한 유치 대상이 아닌 <strong>장기적인 파트너</strong>로 인식합니다.
              <br /><br />
              우리는 고객 중심의 가치 설계와 경험 최적화를 통해<br />
              <strong>고객의 이탈을 최소화</strong>하고, 예측 가능한 구독 수익을 창출하며, 
              AI와 데이터 기반 기술을 활용해 <strong>기업의 지속가능한 성장</strong>을 돕습니다.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <img src={vision} alt="vision" className="object-cover w-full h-full" />
          </div>
        </section>

        <section className="max-w-screen-xl w-full bg-white shadow-lg rounded-xl p-10">
          <h2 className="text-3xl font-bold mb-10 text-center">Vision</h2><br />
          <div className="text-lg text-center mb-10">
            <p>
              <strong>“고객 유지 중심의 구독 관리 패러다임을 선도하는 인텔리전트 플랫폼”</strong>
              <br /><br />
              고객 성공과 수익 안정화를 동시에 이루며, <br />
              업계의 구독 운영 방식에 새로운 기준을 제시합니다.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <img src={visionkey} alt="visionkey" className="object-contain w-[600px] h-auto" />
          </div>
        </section>

        <section className="max-w-screen-xl w-full bg-white shadow-lg rounded-xl p-10">
          <h2 className="text-3xl font-bold mb-10 text-center">Strategy</h2>
          <div className="space-y-16 text-lg">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">AI 분석 기반 전략</h3><br /><br />
                <div className="list-disc list-inside space-y-1">
                  <p>생성형 AI 기반 인사이트 자동 추천</p><br />
                  <p>구독자 이탈 징후 예측 및 대응 전략 수립</p><br />
                  <p>클라이언트 간 구독 성과 벤치마킹</p><br />
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src={analytics} className="w-full h-auto rounded-lg" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <img src={lockin} className="w-full h-auto rounded-lg" />
              </div>
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-xl font-semibold mb-2">고객 락인 전략</h3><br /><br />
                <div className="list-disc list-inside space-y-1">
                  <p>워크플로우 설계로 락인 유도</p><br />
                  <p>장기 구독자 맞춤 혜택 제공</p><br />
                  <p>행동 패턴 기반 이탈 방지 마케팅</p><br />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 order-2 md:order-1">
                <h3 className="text-xl font-semibold mb-2">운영 최적화 전략</h3><br /><br />
                <div className="list-disc list-inside space-y-1">
                  <p>다채널 구독 서비스 통합 관리</p><br />
                  <p>자동 결제/해지/갱신 기능</p><br />
                  <p>권한 기반 조직 운영 시스템</p><br />
                </div>
              </div>
              <div className="md:w-1/2 order-1 md:order-2">
                <img src={care} className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-screen-xl w-full bg-white shadow-lg rounded-xl p-10">
          <h2 className="text-3xl font-bold mb-10 text-center">핵심 가치 (Core Values)</h2><br /><br />
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-lg">
            <div className="md:w-1/2">
              <ul className="list-disc list-inside space-y-4">
                <br /><li><strong>고객 중심:</strong> 모든 의사결정은 고객의 성공과 경험을 기준으로 합니다.</li><br />
                <li><strong>데이터 기반:</strong> 직관이 아닌 데이터로 판단하고 실행합니다.</li><br />
                <li><strong>지속 가능성:</strong> 단기 실적보다 장기 관계를 추구합니다.</li><br />
                <li><strong>정직한 성장:</strong> 핵심가치에 반하는 사업은 과감히 포기합니다.</li><br />
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-center items-center">
              <img src={wevision} alt="wevision" className="object-contain w-[600px] h-auto" />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
