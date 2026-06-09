import type { AxiosRequestConfig } from "axios";

import api from "../config/api";
import { Response } from "../types";

export interface Gift {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  link: string;
  reserved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type GiftInput = Record<string, string | number | boolean | null>;

class GiftService {
  async index(config?: AxiosRequestConfig) {
    const response = await api.get<Response<Gift[]>>("/gift", config);
    return response.data;
  }

  async create(data: GiftInput, config?: AxiosRequestConfig) {
    const response = await api.post<Response<Gift>>("/gift", data, config);
    return response.data;
  }

  async read(id: string | number) {
    const response = await api.get<Response<Gift>>(`/gift/${id}`);
    return response.data;
  }

  async update(id: string | number, data: GiftInput, config?: AxiosRequestConfig) {
    const response = await api.put<Response<Gift>>(`/gift/${id}`, data, config);
    return response.data;
  }

  async reserve(id: string | number) {
    const response = await api.patch<Response<Gift>>(`/gift/${id}/reserve`);
    return response.data;
  }

  async delete(id: string | number) {
    const response = await api.delete<Response<{ message: string }>>(`/gift/${id}`);
    return response.data;
  }
}

export default new GiftService();
