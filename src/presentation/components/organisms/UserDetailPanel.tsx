import { InfoSection } from "@/presentation/components/molecules/InfoSection";
import { useAlarmViewModel } from "@/application/viewModels/useAlarmViewModel";

export function UserDetailPanel({
  onCompanyClick,
  onStaffClick,
  onRequestClick,
  onAlarmClick,
}: {
  onCompanyClick: () => void;
  onStaffClick: () => void;
  onRequestClick: () => void;
  onAlarmClick: () => void;
}) {
  const { alarms, loading, markAsRead } = useAlarmViewModel();

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
        items={
          loading
            ? [
                {
                  id: "loading",
                  subtitle: "불러오는중..",
                  content: "알림 데이터를 가져오는 중 입니다.",
                },
              ]
            : alarms.map((n) => ({
                id: n.id, // ✅ 숫자 그대로 넘김
                subtitle: n.subtitle,
                content: n.content,
                isRead: n.isRead,
                onClick: () => {
                  markAsRead(n.id); // ✅ 숫자 그대로 사용
                  onAlarmClick();
                },
              }))
        }
      />
    </div>
  );
}
