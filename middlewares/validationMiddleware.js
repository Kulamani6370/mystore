import { body, validationResult } from "express-validator";
import { PRODUCT_CATEGORY, PRODUCT_STOCK } from "../utils/constants.js";

/**
 * Common middleware to handle validation results
 */
export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Validate user registration
 */
export const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("mobile")
    .matches(/^\d{10}$/)
    .withMessage("Mobile must be a valid 10 digit number"),
  validateRequest,
];

/**
 * Validate user login
 */
export const validateLogin = [
  body("email").isEmail().withMessage("Provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
  validateRequest,
];

/**
 * Validate add to cart
 */
export const validateAddToCart = [
  body("productId").notEmpty().withMessage("Product ID is required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  validateRequest,
];

/**
 * Validate product creation
 */
export const validateCreateProduct = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("markedprice").notEmpty().withMessage("Product mrp is required"),
  body("price").notEmpty().withMessage("Price must be a non-negative number"),
  body("category")
    .isIn(Object.values(PRODUCT_CATEGORY))
    .notEmpty()
    .withMessage("Category is required"),
  body("stock")
    .isIn(Object.values(PRODUCT_STOCK))
    .withMessage("Stock must be available"),
  validateRequest,
];

/**
 * Validate address input
 */
export const validateAddress = [
  body("fullName").notEmpty().withMessage("Full name is required"),
  body("mobile")
    .matches(/^\d{10}$/)
    .withMessage("Mobile must be a valid 10 digit number"),
  body("house").notEmpty().withMessage("House is required"),
  body("street").notEmpty().withMessage("Street is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("state").notEmpty().withMessage("State is required"),
  body("pincode")
    .matches(/^\d{6}$/)
    .withMessage("Pincode must be a valid 6 digit number"),
  validateRequest,
];
