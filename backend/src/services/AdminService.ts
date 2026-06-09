import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import type { Admin } from "../../generated/prisma/client.ts";
import { HttpError } from "../types.ts";
import { prisma } from "../config/config.ts";

interface LoginResponse {
  admin: Omit<Admin, "passwordHash">;
  token: string;
}

class AdminService {
  async login(email: string, password: string): Promise<LoginResponse> {
    if (!email || !password) {
      throw new HttpError(400, "Email e senha são obrigatórios");
    }

    const admin = await prisma.admin.findUnique({ where: { email } });

    if (!admin) {
      throw new HttpError(401, "Email ou senha inválidos");
    }

    const isPasswordValid = await bcrypt.compare(password, admin.passwordHash);

    if (!isPasswordValid) {
      throw new HttpError(401, "Email ou senha inválidos");
    }

    const token = jwt.sign(
      { adminId: admin.id, email: admin.email },
      process.env.JWT_SECRET || "seu-secreto-super-seguro-aqui",
      { expiresIn: "8h" },
    );

    const { passwordHash, ...adminWithoutPassword } = admin;

    return { admin: adminWithoutPassword, token };
  }

  async read(id: number): Promise<Admin | null> {
    return await prisma.admin.findUnique({ where: { id } });
  }
}

export default new AdminService();
