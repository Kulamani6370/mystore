import { StatusCodes } from "http-status-codes";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod, totalAmount } = req.body;

  const order = new Order({
    user: req.user.userId,
    items,
    shippingAddress,
    paymentMethod,
    totalAmount,
  });

  const saved = await order.save();
  res.status(201).json({ saved, msg: "order placed" });
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.userId }).populate(
    "items.product"
  );
  res.status(StatusCodes.OK).json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("user").populate("items.product");
  res.status(StatusCodes.OK).json(orders);
};
