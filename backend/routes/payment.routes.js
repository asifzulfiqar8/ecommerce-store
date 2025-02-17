import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const app = express();

app.post("/create-checkout-session", isAuthenticated, createCheckoutSession);

export default app;
