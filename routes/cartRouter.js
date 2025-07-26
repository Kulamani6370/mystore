import { Router } from "express";
const router = Router();

import {
  getCart,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import { validateAddToCart } from "../middlewares/validationMiddleware.js";

router.get("/", authenticateUser, getCart);
router.post("/add", authenticateUser, validateAddToCart, addToCart);
router.post("/remove/:productId", authenticateUser, removeFromCart);

export default router;
