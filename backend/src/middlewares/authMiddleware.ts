import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  adminId?: number;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        statusCode: 401,
        message: "Token não fornecido",
      });
    }

    const token = authHeader.substring(7);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "seu-secreto-super-seguro-aqui"
    ) as { adminId: number; email: string };

    req.adminId = decoded.adminId;
    next();
  } catch (error: any) {
    res.status(401).json({
      statusCode: 401,
      message: "Token inválido ou expirado",
    });
  }
};
