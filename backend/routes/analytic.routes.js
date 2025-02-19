import express from "express";
import { adminRoute, isAuthenticated } from "../middlewares/auth.middleware.js";
import { getAnalyticsData } from "../controllers/analytic.controller.js";

const app = express();

app.get("/", isAuthenticated, adminRoute, getAnalyticsData);

export default app;
