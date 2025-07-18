// /src/application/viewModels/LoginViewModel.ts

import { useState } from "react";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/application/stores/AuthStore";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { sendAlarm } from "@/infrastructure/api/Alarm";
import dayjs from "dayjs";
import { useUserStore } from "../stores/UserStore";

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
      const { accessToken } = await loginUseCase.execute(email, password);
      if (!accessToken) throw new Error("서버에서 토큰이 오지 않았습니다.");

      setToken(accessToken, remember);

      const decoded = jwtDecode<JwtPayload>(accessToken);
      const userNo = decoded.user_no;
      if (!userNo) throw new Error("토큰에서 userNo를 받아오지 못했습니다.");

      const user = await userRepository.getMyPageUserInfo(userNo);

      const expiredAt = user.membershipExpiredAt;
      if (expiredAt) {
        const today = dayjs();
        const expiry = dayjs(expiredAt);
        const remainingDays = expiry.diff(today, "day") + 1;

        if (remainingDays <= 7) {
          try {
            await sendAlarm(userNo, "구독 만료가 임박했습니다.");
          } catch (alarmErr) {
            // console.error("❌ 알림 전송 실패:", alarmErr);
          }
        }
      }

      // basicInfo 불러오기
      const basicInfo = await userRepository.getUserBasicInfo();

      // console.log("basicInfo:", basicInfo);
      // console.log("roleNo:", basicInfo.roleNo);

      // UserStore에 저장
      const store = useUserStore.getState();
      store.setUserNo(basicInfo.userNo);
      store.setCompanyNo(basicInfo.companyNo);
      store.setInfoDbNo(basicInfo.infoDbNo);
      store.setRoleNo(basicInfo.roleNo);
      store.setName(basicInfo.name);
      store.setPhone(basicInfo.phone);
      store.setEmail(basicInfo.email);
      store.setRole(basicInfo.roleName);
      store.setDepartmentName(basicInfo.departmentName);

      // localStorage 저장
      const userObject = {
        userNo: basicInfo.userNo,
        companyNo: basicInfo.companyNo,
        infoDbNo: basicInfo.infoDbNo,
        roleNo: basicInfo.roleNo,
        name: basicInfo.name,
        phone: basicInfo.phone,
        email: basicInfo.email,
        createdAt: basicInfo.createdAt,
        updatedAt: basicInfo.updatedAt,
        companyName: basicInfo.companyName,
        departmentName: basicInfo.departmentName,
        role: basicInfo.roleName
      };
      localStorage.setItem("user", JSON.stringify(userObject));

      // console.log("최종 UserStore 상태: ", useUserStore.getState());
      toast.success("로그인 성공!");
      navigate("/dash-board");
    } catch (err) {
      // console.error("로그인 실패:", err);
      alert("로그인에 실패했습니다.\n관리자에게 문의해주세요.");
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