import type { NextFunction, Request, Response } from "express";

import type { ApiResponse } from "../types.ts";
import GuestService from "../services/GuestService.ts";

class GuestController {
  async index(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const name = req.query.name as string | undefined;
      const data = await GuestService.index(name);
      res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GuestService.read({ id: Number(req.params.id) });
      res.status(200).json({ statusCode: 200, data: data ?? null });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GuestService.create(req.body);
      res.status(201).json({ statusCode: 201, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GuestService.update(req.body, { id: Number(req.params.id) });
      res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      await GuestService.delete({ id: Number(req.params.id) });
      res.status(200).json({ statusCode: 200, message: "Deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}

export default new GuestController();
