import express from "express";
import { addToCart, getCardProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const app = express()

app.post("/", isAuthenticated, addToCart)
app.get("/", isAuthenticated, getCardProducts)
app.put("/:id", isAuthenticated, updateQuantity)
app.delete("/", isAuthenticated, removeAllFromCart)


export default app