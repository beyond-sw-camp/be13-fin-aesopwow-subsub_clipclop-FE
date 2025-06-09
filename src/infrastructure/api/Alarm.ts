import axiosInstance from "./Axios";

export interface AlarmItem {
    id: string;
    subtitle: string;
    content: string;
    isRead: boolean;
    createAt: string;
}

// ✅ 알림 전체 조회 (GET /alarms)
export const fetchAlarms = async (): Promise<AlarmItem[]> => {
    const response = await axiosInstance.get(`/alarms`);
    return response.data.map((alarm: any) => ({
        id: alarm.alarmNo,
        subtitle: alarm.title ?? "알림",
        content: alarm.content,
        isRead: alarm.read,
        createAt: alarm.createAt,
    }));
};

// ✅ 알림 전송 (POST /alarms/send)
export const sendAlarm = async (userNo: number, content: string): Promise<void> => {
    await axiosInstance.post(`/alarms/send`, null, {
        params: { userNo, content },
    });
};

// ✅ 알림 읽음 처리 (PATCH /alarms/{alarmId}/read)
// ✅ alarmId를 string | number 모두 받을 수 있도록 변경
export const markAlarmAsRead = async (alarmId: string | number): Promise<void> => {
  await axiosInstance.patch(`/alarms/${Number(alarmId)}/read`);
};
