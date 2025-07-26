import { Router } from "express";
const router = Router();

import {
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  getFeaturedProducts,
} from "../controllers/productController.js";
import { isAdmin, authenticateUser } from "../middlewares/authMiddleware.js";
import upload from "../utils/multer.js";
router.get("/featured", getFeaturedProducts);
router
  .route("/")
  .get(getAllProducts)
  .post(authenticateUser, isAdmin, upload.array("images"), addProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(authenticateUser, isAdmin, upload.array("images"), updateProduct)
  .delete(authenticateUser, isAdmin, deleteProduct);

export default router;
