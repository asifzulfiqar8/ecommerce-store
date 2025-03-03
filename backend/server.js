import express from "express";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticRoutes from "./routes/analytic.routes.js";
import getEnv from "./config/config.js";
import { connectDB } from "./lib/db.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticRoutes);

const PORT = getEnv("PORT") || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at port: http://localhost:${PORT}`);
  connectDB(getEnv("MONGO_URI"));
});
