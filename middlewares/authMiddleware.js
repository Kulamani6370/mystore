import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/generateToken.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError("authentication invalid");
  }
  try {
    const { userId, role } = verifyJWT(token);
    // const testUser = userId === "67af8ad825212678b50129f8";
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

// export const checkForTestUser = (req, res, next) => {
//   if (req.user.testUser) throw new BadRequestError("Demo User. Read only!");
//   next();
// };

export const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};
