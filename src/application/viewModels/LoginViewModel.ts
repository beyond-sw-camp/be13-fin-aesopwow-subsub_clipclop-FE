import { useState } from "react";
import { LoginUseCase } from "../useCases/LoginUseCase";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/application/stores/AuthStore";
import { UserRepository } from "@/infrastructure/repositories/UserRepository";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface JwtPayload {
    email: string;
    role: string;
    user_no: number; // userNo 타입에 맞게 수정
    // ... 필요시 다른 필드 추가
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
            // 1. 로그인 → accessToken만 받음
            const { accessToken } = await loginUseCase.execute(email, password);

            if (!accessToken) {
                throw new Error("서버에서 토큰이 오지 않았습니다.");
            }

            // 2. 토큰을 zustand에 저장
            setToken(accessToken, remember);

            // 3. 토큰에서 userNo 추출 (jwt-decode 사용)
            const decoded = jwtDecode<JwtPayload>(accessToken);
            const userNo = decoded.user_no;

            if (!userNo) throw new Error("토큰에서 userNo를 받아오지 못했습니다.");

            // 4. 마이페이지 정보 가져오기 (UserRepository 활용)
            const user = await userRepository.getMyPageUserInfo(Number(userNo));

            // 5. localStorage에 사용자 정보 저장
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