import type { AxiosRequestConfig } from "axios";

import api from "../config/api";
import { Response } from "../types";

export interface Admin {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginResponse {
  admin: Admin;
  token: string;
}

class AdminService {
  async login(
    email: string,
    password: string,
    config?: AxiosRequestConfig
  ) {
    const response = await api.post<Response<LoginResponse>>(
      "/admin/login",
      { email, password },
      config
    );
    return response.data;
  }

  getToken(): string | null {
    return localStorage.getItem("admin_token");
  }

  setToken(token: string): void {
    localStorage.setItem("admin_token", token);
  }

  removeToken(): void {
    localStorage.removeItem("admin_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  verifyToken(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return false;
      const payload = JSON.parse(atob(parts[1]));
      return typeof payload.exp === "number" && payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}

export default new AdminService();
