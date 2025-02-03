import express from "express";
import { addToCart, getCartProducts, removeAllFromCart, updateQuantity } from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";

const app = express()

app.get("/", isAuthenticated, getCartProducts)
app.post("/", isAuthenticated, addToCart)
app.put("/:id", isAuthenticated, updateQuantity)
app.delete("/", isAuthenticated, removeAllFromCart)


export default app