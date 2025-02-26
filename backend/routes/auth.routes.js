import express from "express";
import {
  login,
  logout,
  signup,
  getProfile,
  refreshToken,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const app = express();

app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.get("get-profile", isAuthenticated, getProfile);
app.post("/refresh-token", refreshToken);

export default app;
