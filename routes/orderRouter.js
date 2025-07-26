import { Router } from "express";
const router = Router();
import {
  placeOrder,
  getAllOrders,
  getMyOrders,
} from "../controllers/orderController.js";

import { authenticateUser, isAdmin } from "../middlewares/authMiddleware.js";

router.post("/", authenticateUser, placeOrder);
router.get("/my", authenticateUser, getMyOrders);

// Admin route to get all orders
router.get("/", isAdmin, getAllOrders);

export default router;
