import { StatusCodes } from "http-status-codes";
import Cart from "../models/cartModel.js";

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.userId }).populate(
    "items.product"
  );
  res.json(cart || { user: req.user.userId, items: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.userId });
  if (!cart) cart = await Cart.create({ user: req.user.userId, items: [] });

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );
  if (existingItem) existingItem.quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await cart.save();
  res.status(StatusCodes.OK).json(cart);
};

export const removeFromCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user.userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );
  await cart.save();

  res.status(StatusCodes.OK).json(cart);
};
