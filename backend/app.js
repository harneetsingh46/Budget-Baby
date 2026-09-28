import dotenv from "dotenv";
import express from "express";
import authRouter from "./src/routes/auth.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import budgetRouter from "./src/routes/budget.routes.js";
import purchaseRouter from "./src/routes/purchase.route.js";
import dashboardRouter from "./src/routes/dashboard.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./config/db.js";

//config
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://budget-baby.vercel.app/",
      "http://localhost:5173",
      "https://budget-baby.vercel.app/",
    ],
    credentials: true,
  }),
);
app.use(async (req, res, next) => {
  try {
    await db();
    next();
  } catch (err) {
    res.status(500).json({ message: "DB connection failed" });
  }
});

//routes
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/purchase", purchaseRouter);
app.use("/api/dashboard", dashboardRouter);

export default app;
