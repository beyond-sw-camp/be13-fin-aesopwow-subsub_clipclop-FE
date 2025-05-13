import { useAuthStore } from "@/application/stores/AuthStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  if (!token) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;