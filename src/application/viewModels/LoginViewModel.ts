// 📁 /src/application/viewModels/LoginViewModel.ts

import { useState } from "react";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/application/stores/AuthStore";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { sendAlarm } from "@/infrastructure/api/Alarm";
import dayjs from "dayjs"; // ✅ 날짜 계산용

interface JwtPayload {
  email: string;
  role: string;
  user_no: number;
}

export const useLoginViewModel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const loginUseCase = new LoginUseCase();
  const setToken = useAuthStore((state) => state.setToken);
  const userRepository = new UserRepository();

  const onClickLoginButton = async (
    email: string,
    password: string,
    remember: boolean
  ) => {
    setLoading(true);
    setError(null);

    try {
      // 1. 로그인 수행 → 토큰 수신
      const { accessToken } = await loginUseCase.execute(email, password);

      if (!accessToken) {
        throw new Error("서버에서 토큰이 오지 않았습니다.");
      }

      // 2. 토큰 저장
      setToken(accessToken, remember);

      // 3. 토큰 디코딩 → 사용자 번호 추출
      const decoded = jwtDecode<JwtPayload>(accessToken);
      const userNo = decoded.user_no;

      if (!userNo) throw new Error("토큰에서 userNo를 받아오지 못했습니다.");

      // 4. 사용자 정보 조회
      const user = await userRepository.getMyPageUserInfo(Number(userNo));

      // 5. 남은 일수 계산 및 7일 이하일 경우 알림 전송
      const expiredAt = user.membershipExpiredAt;
      if (expiredAt) {
        const today = dayjs();
        const expiry = dayjs(expiredAt);
        const remainingDays = expiry.diff(today, "day") + 1;

        if (remainingDays <= 7) {
          try {
            await sendAlarm(userNo, "구독 만료가 임박했습니다.");
          } catch (alarmErr) {
            console.error("❌ 알림 전송 실패:", alarmErr);
          }
        }
      }

      // 6. 사용자 정보 localStorage에 저장
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("로그인 성공!");
      navigate("/dash-board");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
      setError("로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    onClickLoginButton,
  };
};
