import { useEffect, useState } from "react";
import {
  fetchAlarms,
  sendAlarm,
  markAlarmAsRead,
  AlarmItem,
} from "@/infrastructure/api/Alarm";
import { getUser } from "@/application/stores/UserStore";

const PAGE_SIZE = 5;

export const useAlarmViewModel = () => {
  const [allAlarms, setAllAlarms] = useState<AlarmItem[]>([]);
  const [alarms, setAlarms] = useState<AlarmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [userNo, setUserNo] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // 전체 알림 불러오기 → 내부적으로 paging 분리
  const loadAlarms = async () => {
    try {
      setLoading(true);
      const data = await fetchAlarms();
      setAllAlarms(data);
      const firstPage = data.slice(0, PAGE_SIZE);
      setAlarms(firstPage);
      setHasMore(data.length > PAGE_SIZE);
    } catch (e) {
      console.error("알림 불러오기 실패", e);
    } finally {
      setLoading(false);
    }
  };

  // 추가 알림 로딩
  const loadMore = () => {
    const nextLength = alarms.length + PAGE_SIZE;
    const next = allAlarms.slice(0, nextLength);
    setAlarms(next);
    setHasMore(allAlarms.length > next.length);
  };

  // 알림 전송
  const send = async (content: string) => {
    try {
      if (userNo === null) throw new Error("userNo 없음");
      await sendAlarm(userNo, content);
      await loadAlarms();
    } catch (e) {
      console.error("알림 전송 실패", e);
    }
  };

  // 알림 읽음 처리
  const markAsRead = async (alarmId: string | number) => {
    try {
      await markAlarmAsRead(alarmId);
      await loadAlarms();
    } catch (e) {
      console.error("알림 읽음 처리 실패", e);
    }
  };

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user?.userNo) setUserNo(user.userNo);
      } catch (e) {
        console.error("유저 정보 불러오기 실패", e);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (userNo !== null) {
      loadAlarms();
    }
  }, [userNo]);

  return {
    alarms,
    loading,
    hasMore,
    loadMore,
    send,
    markAsRead,
  };
};