import type { AxiosRequestConfig } from "axios";

import api from "../config/api";
import { Response } from "../types";

export interface Gift {
  id: number;
  name: string;
}

export interface Guest {
  id: number;
  name: string;
  confirmed: boolean;
  giftId: number | null;
  gift: Gift | null;
  createdAt: Date;
  updatedAt: Date;
}

export type GuestInput = Record<string, string | number | boolean | null>;

class GuestService {
  async index(config?: AxiosRequestConfig) {
    const response = await api.get<Response<Guest[]>>("/guest", config);
    return response.data;
  }

  async create(data: GuestInput, config?: AxiosRequestConfig) {
    const response = await api.post<Response<Guest>>("/guest", data, config);
    return response.data;
  }

  async read(id: string | number) {
    const response = await api.get<Response<Guest>>(`/guest/${id}`);
    return response.data;
  }

  async update(id: string | number, data: GuestInput, config?: AxiosRequestConfig) {
    const response = await api.put<Response<Guest>>(`/guest/${id}`, data, config);
    return response.data;
  }

  async delete(id: string | number) {
    const response = await api.delete<Response<{ message: string }>>(`/guest/${id}`);
    return response.data;
  }
}

export default new GuestService();
