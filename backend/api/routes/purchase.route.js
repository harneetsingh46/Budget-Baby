import express from "express";
import {
  createPurchase,
  deletePurchase,
  getPurchasesByBudget,
} from "../controllers/purchase.controller.js";
import { protect } from "../../utils/protect.js";
const router = express.Router();

router.post("/", protect, createPurchase);
router.get("/:budgetId", protect, getPurchasesByBudget);
router.delete("/:id", protect, deletePurchase);

export default router;
