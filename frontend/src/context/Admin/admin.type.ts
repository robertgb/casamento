import { Admin } from "../../services/AdminService";

export type AdminContextData = {
  isAuthenticated: boolean;
  admin: Admin | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};
