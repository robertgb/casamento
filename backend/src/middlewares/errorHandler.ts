import type { NextFunction, Request, Response } from "express";

import type { ApiResponse } from "../types.ts";
import type { HttpError } from "../types.ts";

export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
) => {
  const status = err.status || 400;
  res.status(status).json({ statusCode: status, message: err.message || "Erro interno" });
};
