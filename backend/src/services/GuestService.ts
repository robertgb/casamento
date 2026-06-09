import type {
  GuestCreateInput,
  GuestUpdateInput,
  GuestWhereUniqueInput,
} from "../../generated/prisma/models.ts";

import { prisma } from "../config/config.ts";

class GuestService {
  async index(name?: string) {
    if (name) {
      return await prisma.guest.findMany({ where: { name } });
    }
    return await prisma.guest.findMany();
  }

  async create(data: GuestCreateInput) {
    const name = typeof data.name === "string" ? data.name.trim() : "";

    if (!name) {
      throw new Error("Nome é obrigatório");
    }

    const found = await prisma.guest.findFirst({ where: { name } });

    if (found) {
      throw new Error("O convidado já confirmou sua presença.");
    }

    return await prisma.guest.create({ data: { name, confirmed: true } });
  }

  async read(where: GuestWhereUniqueInput) {
    return await prisma.guest.findUnique({ where });
  }

  async update(data: GuestUpdateInput, where: GuestWhereUniqueInput) {
    return await prisma.guest.update({ data, where });
  }

  async delete(where: GuestWhereUniqueInput) {
    return await prisma.guest.delete({ where });
  }
}

export default new GuestService();
