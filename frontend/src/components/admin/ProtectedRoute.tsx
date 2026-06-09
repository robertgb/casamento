import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import AdminService from "../../services/AdminService";
import { useAdmin } from "../../context/Admin/admin.hook";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, logout } = useAdmin();

  const tokenValid = isAuthenticated && AdminService.verifyToken();

  useEffect(() => {
    if (isAuthenticated && !tokenValid) {
      logout();
    }
  }, [isAuthenticated, tokenValid, logout]);

  if (!isAuthenticated || !tokenValid) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
