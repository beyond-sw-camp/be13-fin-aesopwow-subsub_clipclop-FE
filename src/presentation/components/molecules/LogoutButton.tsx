import { CustomButton } from "../atoms/CustomButton"
import { LogoutUseCase } from "@/application/useCases/LogoutUseCase";

export const LogoutButton = () => {
    const { logout } = LogoutUseCase();

    return (
        <CustomButton title={"LogOut"} loading={false} onClick={logout}>
            로그아웃
        </CustomButton>
    );
};