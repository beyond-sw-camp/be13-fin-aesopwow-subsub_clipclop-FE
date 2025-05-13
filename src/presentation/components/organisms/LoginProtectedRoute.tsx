import { useAuthStore } from "@/application/stores/AuthStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  console.log("Token:", token);
  console.log("Is Initialized:", isInitialized);

  if (!isInitialized) {
    // 아직 토큰 로딩 중이면 아무것도 렌더링하지 않음 (또는 로딩 UI)
    return <div className="w-screen h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!token) {
    return <Navigate to="/signin" />;
  }


  return <>{children}</>;
};

export default ProtectedRoute;
