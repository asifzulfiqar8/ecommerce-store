import getEnv from "../config/config.js";
import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import {
  generateTokens,
  setCookies,
  storeRefreshToken,
} from "../utils/utils.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const { refreshToken, accessToken } = generateTokens(user._id);

    await storeRefreshToken(user._id, refreshToken);

    setCookies(res, accessToken, refreshToken);

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  res.send("login route called");
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log("refresh", refreshToken);
    let decoded;
    if (refreshToken) {
      try {
        let seceret = getEnv("REFRESH_TOKEN_SECRET");
        decoded = await jwt.decode(refreshToken, seceret);
      } catch (error) {
        console.log("error while refreshing toden decoded", error);
      }
    }

    console.log("decodeToken", decoded);
    await redis.del(`refresh_token:${decoded?.userId}`);
    res.cookie("accessToken", null, {
      httpOnly: true,
      secure: getEnv("NODE_ENV") === "production",
      sameSite: "strict",
      maxAge: 0,
    });

    res.cookie("refreshToken", null, {
      httpOnly: true, // prevent XSS attacks, cross site scripting attacks
      secure: getEnv("NODE_ENV") === "production",
      sameSite: "strict", // prevent CSRF attacks, cross site request forgery attacks
      maxAge: 0, // 7 days
    });
    res.status(201).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("error while loging out ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
