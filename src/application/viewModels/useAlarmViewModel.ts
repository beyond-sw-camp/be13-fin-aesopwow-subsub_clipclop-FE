// 이게 진짜임

// import { useEffect, useState } from "react"
// import { fetchAlarms, sendAlarm, AlarmItem } from "@/infrastructure/api/Alarm";

// export const useAlarmViewModel = (userNo: number) => {
//     const [alarms, setAlarms] = useState<AlarmItem[]>([]);
//     const [loading, setLoading] = useState(true);

//     const loadAlarms = async () => {
//         try {
//             const data = await fetchAlarms(userNo);
//             setAlarms(data);
//         } catch (e) {
//             console.error("알림 불러오기 실패")
//         } finally {
//             setLoading(false);
//         }
//     };

//     const send = async (content: string) => {
//         await sendAlarm(userNo, content);
//         await loadAlarms();
//     };

//     useEffect(() => {
//         loadAlarms();
//     }, [userNo]);
    
//     return {
//         alarms,
//         loading,
//         send,
//     }
// }


//테스트좀 할게요

import { useEffect, useState } from "react";
import { fetchAlarms, /*sendAlarm,*/ AlarmItem } from "@/infrastructure/api/Alarm";

export const useAlarmViewModel = () => {
    const [alarms, setAlarms] = useState<AlarmItem[]>([]);
    const [loading, setLoading] = useState(true);

    const loadAlarms = async () => {
        try {
            const data = await fetchAlarms(); 
            setAlarms(data);
        } catch (e) {
            console.error("알림 불러오기 실패", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAlarms();
    }, []);

    return {
        alarms,
        loading,
        // send,
    };
};

