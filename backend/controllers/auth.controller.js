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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      const { accessToken, refreshToken } = generateTokens(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCookies(res, refreshToken, accessToken);

      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        message: "User logged in successfully",
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Invalide email or password" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decode = jwt.decode(refreshToken, getEnv("REFRESH_TOKEN_SECRET"));
      await redis.del(`refresh_token:${decode.userId}`);

      res.clearCookie("refreshToken");
      res.clearCookie("accessToken");
      res.status(201).json({ message: "Logged out successfully" });
    }
  } catch (error) {
    console.log("error while loging out ", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.log("error in getProfile controller", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      res.status(401).json({ message: "No refresh token provided" });

    const decoded = jwt.decode(refreshToken, getEnv("REFRESH_TOKEN_SECRET"));
    const storedToken = await redis.get(`refresh_token:${decoded.userId}`);

    if (storedToken !== refreshToken)
      res.status(401).json({ message: "Invalide refresh token provided" });

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      getEnv("ACCESS_TOKEN_SECRET"),
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: getEnv("NODE_ENV") === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.status(201).json({ message: "Access token refreshed successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error.message });
  }
};
