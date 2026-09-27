import express from "express";
import { protect } from "../../utils/protect.js";
import { getDashboardData } from "../controllers/dashboard.controller.js";
const router = express.Router();

router.get("/", protect, getDashboardData);

export default router;
