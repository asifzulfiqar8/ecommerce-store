import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductByCategory,
  getRecommendedProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, isAuthenticated } from "../middlewares/auth.middleware.js";

const app = express();

app.post("/", isAuthenticated, adminRoute, createProduct);
app.get("/", isAuthenticated, adminRoute, getAllProducts);
app.get("/:id", isAuthenticated, adminRoute, toggleFeaturedProduct);
app.get("/featured-products", getFeaturedProducts);
app.get("/get-recommended-products", getRecommendedProducts);
app.get("/category/:category", getProductByCategory)
app.delete("/:id", deleteProduct);

export default app;
