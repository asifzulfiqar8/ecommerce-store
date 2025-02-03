import jwt from "jsonwebtoken";
import getEnv from "../config/config.js";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;

    if (!accessToken)
      return res
        .status(401)
        .json({ message: "Unauthorized, access token not provided" });

    try {
      const decoded = jwt.decode(accessToken, getEnv("ACCESS_TOKEN_SECRET"));
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      next();
    } catch (error) {
      if (error.message === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Unauthorized, token expired error" });
      }
      throw error;
    }
  } catch (error) {
    console.log("Error in isAuthenticated function", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const adminRoute = async (req, res, next) => {
  if (req.user && res.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};
