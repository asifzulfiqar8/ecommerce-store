import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { getCoupon, validateCoupon } from "../controllers/coupon.controller.js";

const app = express();

app.get("/", isAuthenticated, getCoupon)
app.get("/validate", isAuthenticated, validateCoupon)

export default app;