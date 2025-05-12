import { InfoSection } from "@/presentation/components/molecules/InfoSection";

export function UserDetailPanel() {
  return (
    <div className="flex flex-col gap-6 w-1/2 mx-auto">
      <InfoSection
        title="정보"
        items={[
          { subtitle: "회사 정보", content: "구독, 결제, 회사 정보" },
        ]}
      />
      <InfoSection
        title="관리"
        items={[
          { subtitle: "직원 관리", content: "유저 추가, 삭제, 수정" },
          { subtitle: "요청 내역 관리", content: "분석 내역" },
        ]}
      />
      <InfoSection
        title="알림"
        items={[
          { subtitle: "분석 결과 생성", content: "분석 결과가 성공적으로 생성되었습니다!" },
          { subtitle: "Ultimate 모델 구독", content: "결제 성공하였습니다." },
        ]}
      />
    </div>
  );
}
