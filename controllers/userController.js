import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/generateToken.js";
import { StatusCodes } from "http-status-codes";
import { NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "customer";
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const { name, email, password, mobile } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ msg: "User already exists." });
  const user = await User.create({ name, email, password, mobile });
  res.status(StatusCodes.CREATED).json({ user, msg: "user created" });
};

export const login = async (req, res) => {
  //   const { email, password } = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("invalid credentials");

  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");
  const token = createJWT({ userId: user._id, role: user.role });
  //   console.log(token);

  const oneDay = 1000 * 60 * 60 * 24 * 7;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.CREATED).json({
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const addAddress = async (req, res) => {
  const userId = req.params.id;
  const addressData = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found.");
    }
    user.addresses.push(addressData);
    await user.save();

    res.status(StatusCodes.OK).json({
      msg: "Address added successfully",
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const newUser = { ...req.body };
  delete newUser.password;

  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);

  res.status(StatusCodes.OK).json({ user: updatedUser, msg: "user updated" });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const products = await Product.countDocuments();
  res.status(StatusCodes.OK).json({ users, products });
};
