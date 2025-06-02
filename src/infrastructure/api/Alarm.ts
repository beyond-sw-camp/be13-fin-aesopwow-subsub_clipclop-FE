import axiosInstance from "./Axios";

export interface AlarmItem {
    id: string;
    subtitle: string;
    content: string;
    isRead: boolean;
    createAt: string;
}

// 인증된 사용자 기준 알림 조회
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

// 인증된 사용자 기준 알림 전송
export const sendAlarm = async (userNo: number, content: string): Promise<void> => {
    await axiosInstance.post(`/alarms/send`, null, {
        params: { userNo, content },
    });
};


