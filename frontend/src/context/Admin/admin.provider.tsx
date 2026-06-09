import { PropsWithChildren, useCallback, useState } from "react";

import AdminService, { Admin } from "../../services/AdminService";

import { AdminContext } from "./admin.context";

export function AdminProvider({ children }: PropsWithChildren) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    return AdminService.getToken();
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
