import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import AdminService, { Admin } from "../../services/AdminService";

import { AdminContext } from "./admin.context";

export function AdminProvider({ children }: PropsWithChildren) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    const stored = AdminService.getToken();
    if (stored && !AdminService.verifyToken()) {
      AdminService.removeToken();
      return null;
    }
    return stored;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await AdminService.login(email, password);

      if (response.data) {
        const { admin: adminData, token: newToken } = response.data;
        AdminService.setToken(newToken);
        setToken(newToken);
        setAdmin(adminData);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    AdminService.removeToken();
    setToken(null);
    setAdmin(null);
  }, []);

  useEffect(() => {
    const handler = () => {
      AdminService.removeToken();
      setToken(null);
      setAdmin(null);
    };
    window.addEventListener("admin:unauthorized", handler);
    return () => window.removeEventListener("admin:unauthorized", handler);
  }, []);

  const value = {
    isAuthenticated: !!token,
    admin,
    token,
    login,
    logout,
    isLoading,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}
