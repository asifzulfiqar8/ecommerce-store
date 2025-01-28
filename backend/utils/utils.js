import jwt from "jsonwebtoken";
import getEnv from "../config/config.js";
import { redis } from "../lib/redis.js";

const generateTokens = (userId) => {
  const refreshToken = jwt.sign({ userId }, getEnv("REFRESH_TOKEN_SECRET"), {
    expiresIn: "15m",
  });

  const accessToken = jwt.sign({ userId }, getEnv("ACCESS_TOKEN_SECRET"), {
    expiresIn: "7d",
  });

  return { refreshToken, accessToken };
};

const setCookies = (res, refreshToken, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attacks
    secure: getEnv("NODE_ENV") === "production",
    sameSite: "strict", // prevent CSRF attacks, cross site request forgery attacks
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attacks
    secure: getEnv("NODE_ENV") === "production",
    sameSite: "strict", // prevent CSRF attacks, cross site request forgery attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  ); // 7 days
};

export { generateTokens, setCookies, storeRefreshToken };
