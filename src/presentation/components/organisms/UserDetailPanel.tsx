import { useEffect, useRef, useCallback } from "react";
import { InfoSection } from "@/presentation/components/molecules/InfoSection";
import { useAlarmViewModel } from "@/application/viewModels/useAlarmViewModel";

export function UserDetailPanel({
  onMyInfoClick,
  onStaffClick,
  onAlarmClick,
}: {
  onMyInfoClick: () => void;
  onStaffClick: () => void;
  onAlarmClick: () => void;
}) {
  const { alarms, loading, markAsRead, hasMore, loadMore } = useAlarmViewModel();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const observeBottom = useCallback(() => {
    if (!bottomRef.current || !hasMore) return;
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    observerRef.current.observe(bottomRef.current);
  }, [hasMore, loadMore]);

  useEffect(() => {
    observeBottom();
    return () => observerRef.current?.disconnect();
  }, [alarms, observeBottom]);

  return (
    <div className="flex flex-col gap-6 w-1/2 mx-auto">
      <InfoSection
        title="정보"
        items={[
          {
            id: "myinfo",
            subtitle: "내 정보",
            // content: "구독, 결제, 회사 정보",
            onClick: onMyInfoClick,
          },
        ]}
      />

      <InfoSection
        title="관리"
        items={[
          {
            id: "staff",
            subtitle: "직원 관리",
            // content: "유저 추가, 삭제, 수정",
            onClick: onStaffClick,
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
                  // content: "알림 데이터를 가져오는 중 입니다.",
                },
              ]
            : alarms.map((n) => ({
                id: n.id,
                subtitle: n.subtitle,
                content: n.content,
                isRead: n.isRead,
                onClick: () => {
                  markAsRead(n.id);
                  onAlarmClick();
                },
              }))
        }
      />
    </div>
  );
}