import mongoose from "mongoose";
import {
  PRODUCT_CATEGORY,
  PRODUCT_STOCK,
  PRODUCT_UNIT,
} from "../utils/constants.js";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: 2,
    },
    description: {
      type: String,
      minlength: 10,
    },
    category: {
      type: String,
      required: true,
      enum: Object.values(PRODUCT_CATEGORY),
    },
    brand: {
      type: String,
      default: "Generic",
    },
    markedprice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number, // percentage
      min: 0,
      max: 100,
      default: 0,
    },
    stock: {
      type: String,
      required: true,
      enum: Object.values(PRODUCT_STOCK),
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "Product Image" },
      },
    ],
    unit: {
      type: String,
      enum: Object.values(PRODUCT_UNIT),
      required: true,
    },
    tags: [String], // e.g., ["organic", "new", "bestseller"]
    isFeatured: {
      type: Boolean,
      default: false,
    },
    reviews: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
