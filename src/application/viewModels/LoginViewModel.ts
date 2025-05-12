import { useState } from "react";

export function useLoginViewModel() {
  const [loading, setLoading] = useState(false);

  // email, password를 파라미터로 받음
  const onClickSignInButton = async (_email: string, _password: string) => {
    setLoading(true);
    try {
      // 실제 로그인 usecase(API 호출 등) 작성

      await new Promise((resolve) => setTimeout(resolve, 2000)); // 예시: 2초 대기

      // 로그인 성공 처리 (예: 토큰 저장, 페이지 이동 등)
    } catch (error) {
      // 에러 처리 (예: 에러 메시지 상태 업데이트)
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    onClickSignInButton,
  };
}
