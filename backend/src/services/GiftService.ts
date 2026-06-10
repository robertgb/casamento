import type {
  GiftCreateInput,
  GiftUpdateInput,
  GiftWhereUniqueInput,
} from "../../generated/prisma/models.ts";

import { prisma } from "../config/config.ts";

interface GiftInput {
  name?: unknown;
  description?: unknown;
  price?: unknown;
  image?: unknown;
  link?: unknown;
}

class GiftService {
  private validateInput(data: GiftInput): void {
    if (!data.name || typeof data.name !== "string" || data.name.trim() === "") {
      throw new Error("Nome é obrigatório");
    }

    if (!data.description || typeof data.description !== "string" || data.description.trim() === "") {
      throw new Error("Descrição é obrigatória");
    }

    if (!data.price || Number(data.price) <= 0) {
      throw new Error("Preço deve ser maior que 0");
    }

    if (!data.image || typeof data.image !== "string" || data.image.trim() === "") {
      throw new Error("Imagem é obrigatória");
    }

    if (!data.link || typeof data.link !== "string" || data.link.trim() === "") {
      throw new Error("Link é obrigatório");
    }
  }

  async index() {
    const gifts = await prisma.gift.findMany();
    const giftIds = gifts.map((gift) => gift.id);
    const guests = await prisma.guest.findMany({ where: { giftId: { in: giftIds } } });
    const guestsByGiftId = new Map(guests.map((guest) => [guest.giftId, guest]));

    return gifts.map((gift) => ({
      ...gift,
      reservedBy: guestsByGiftId.get(gift.id)?.name ?? null,
    }));
  }

  async create(data: GiftCreateInput) {
    this.validateInput(data);
    return await prisma.gift.create({ data });
  }

  async read(where: GiftWhereUniqueInput) {
    return await prisma.gift.findUnique({ where });
  }

  async update(data: GiftUpdateInput, where: GiftWhereUniqueInput) {
    this.validateInput(data);
    return await prisma.gift.update({ data, where });
  }

  async reserve(id: number) {
    const gift = await prisma.gift.findUnique({ where: { id } });

    if (!gift) {
      throw new Error("Presente não encontrado");
    }

    if (gift.reserved) {
      throw new Error("Este presente já foi reservado");
    }

    return await prisma.gift.update({ data: { reserved: true }, where: { id } });
  }

  async delete(where: GiftWhereUniqueInput) {
    return await prisma.gift.delete({ where });
  }
}

export default new GiftService();
