import dotenv from "dotenv";
import express from "express";
import authRouter from "./src/routes/auth.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import budgetRouter from "./src/routes/budget.routes.js";
import purchaseRouter from "./src/routes/purchase.route.js";
import dashboardRouter from "./src/routes/dashboard.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

//config
const app = express();
dotenv.config();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))

//routes
app.use("/api/auth", authRouter)
app.use("/api/category", categoryRouter);
app.use("/api/budget", budgetRouter);
app.use("/api/purchase",purchaseRouter)
app.use("/api/dashboard",dashboardRouter)

export default app;