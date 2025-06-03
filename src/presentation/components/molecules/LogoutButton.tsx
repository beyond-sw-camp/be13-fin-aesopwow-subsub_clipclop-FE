import { CustomButton } from "../atoms/CustomButton"
import { LogoutUseCase } from "@/application/useCases/LogoutUseCase";

export const LogoutButton = () => {
    const { logout } = LogoutUseCase();

    return (
        <CustomButton
          title={"LogOut"}
          loading={false}
          onClick={() => {
            logout(); // 이게바로 LogoutUseCase에서 넘어온 함수
          }}
>
  로그아웃
</CustomButton>
    );
};