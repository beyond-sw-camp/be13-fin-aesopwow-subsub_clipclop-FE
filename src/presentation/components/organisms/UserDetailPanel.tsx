import { InfoSection } from "@/presentation/components/molecules/InfoSection";

export function UserDetailPanel({
  onCompanyClick,
  onStaffClick,
  onRequestClick,
}: {
  onCompanyClick: () => void;
  onStaffClick: () => void;
  onRequestClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-6 w-1/2 mx-auto">
      <InfoSection
        title="정보"
        items={[
          {
            id: "company",
            subtitle: "회사 정보",
            content: "구독, 결제, 회사 정보",
            onClick: onCompanyClick,
          },
        ]}
      />
      <InfoSection
        title="관리"
        items={[
          {
            id: "staff",
            subtitle: "직원 관리",
            content: "유저 추가, 삭제, 수정",
            onClick: onStaffClick,
          },
          {
            id: "request",
            subtitle: "요청 내역 관리",
            content: "분석 내역",
            onClick: onRequestClick,
          },
        ]}
      />
      <InfoSection
        title="알림"
        items={[
          {
            id: "alert-1",
            subtitle: "분석 결과 생성",
            content: "분석 결과가 성공적으로 생성되었습니다!",
          },
          {
            id: "alert-2",
            subtitle: "Ultimate 모델 구독",
            content: "결제 성공하였습니다.",
          },
        ]}
      />
    </div>
  );
}
