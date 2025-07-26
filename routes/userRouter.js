import { Router } from "express";
const router = Router();
import {
  register,
  login,
  getUserProfile,
  getApplicationStats,
  updateUser,
  addAddress,
} from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";
import {
  validateAddress,
  validateLogin,
  validateRegister,
} from "../middlewares/validationMiddleware.js";

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/:id/address", validateAddress, addAddress);
router.patch("/update-user", authenticateUser, updateUser);
router.get("/profile", authenticateUser, getUserProfile);
router.get("/app-stats", getApplicationStats);

export default router;
