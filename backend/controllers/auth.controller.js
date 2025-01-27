import getEnv from "../config/config.js";
import { redis } from "../lib/redis.js";
import User from "../models/user.model.js";
import { generateTokens, setCookies, storeRefreshToken } from "../utils/utils.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const {refreshToken, accessToken} = generateTokens(user._id)
    
    await storeRefreshToken(user._id, refreshToken)

    setCookies(res, accessToken, refreshToken)

    res
      .status(201)
      .json({
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
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
    console.log('refresh', refreshToken)
    if(refreshToken) {
      const verify = jwt.decode(refreshToken)
      const decoded = jwt.verify(refreshToken, getEnv("REFRESH_TOKEN_SECRET"))
      await redis.del(`refresh_token:${decoded.userId}`)
      console.log('refreshtoken', refreshToken)
      console.log('verifyied', verify)
      console.log('refreshtoken', decoded)
    }

    res.clearCookies('accessToken')
    res.clearCookies('refreshToken')
    res.status(201).json({message: "Logged out successfully"})
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message})
  }
};
