import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  checkoutSuccess,
  createCheckoutSession,
} from "../controllers/payment.controller.js";

const app = express();

app.post("/create-checkout-session", isAuthenticated, createCheckoutSession);
app.post("/checkout-success", isAuthenticated, checkoutSuccess);

export default app;
