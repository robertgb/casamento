import type { NextFunction, Request, Response } from "express";

import type { ApiResponse } from "../types.ts";
import GiftService from "../services/GiftService.ts";

class GiftController {
  async index(_req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GiftService.index();
      res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  async read(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GiftService.read({ id: Number(req.params.id) });
      res.status(200).json({ statusCode: 200, data: data ?? null });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GiftService.create(req.body);
      res.status(201).json({ statusCode: 201, data });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GiftService.update(req.body, { id: Number(req.params.id) });
      res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  async reserve(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const data = await GiftService.reserve(Number(req.params.id));
      res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      await GiftService.delete({ id: Number(req.params.id) });
      res.status(200).json({ statusCode: 200, message: "Deletado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}

export default new GiftController();
