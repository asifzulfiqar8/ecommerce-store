import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Payment route"))

export default app;