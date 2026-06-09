import { Router } from "express";

import AdminController from "../controllers/AdminController.ts";
import GiftController from "../controllers/GiftController.ts";
import GuestController from "../controllers/GuestController.ts";
import { authMiddleware } from "../middlewares/authMiddleware.ts";

const router = Router();

// Admin routes
router.post("/admin/login", AdminController.login);

// Gift routes
router.get("/gift", GiftController.index);
router.get("/gift/:id", GiftController.read);
router.patch("/gift/:id/reserve", GiftController.reserve);
router.post("/gift", authMiddleware, GiftController.create);
router.put("/gift/:id", authMiddleware, GiftController.update);
router.delete("/gift/:id", authMiddleware, GiftController.delete);

// Guest routes
router.get("/guest", GuestController.index);
router.get("/guest/:id", GuestController.read);
router.post("/guest", GuestController.create);
router.put("/guest/:id", GuestController.update);
router.delete("/guest/:id", GuestController.delete);

export default router;
