import type { NextFunction, Request, Response } from "express";

import type { ApiResponse } from "../types.ts";
import AdminService from "../services/AdminService.ts";

class AdminController {
  async login(req: Request, res: Response<ApiResponse>, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = await AdminService.login(email, password);
      res.status(200).json({ statusCode: 200, data });
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();
