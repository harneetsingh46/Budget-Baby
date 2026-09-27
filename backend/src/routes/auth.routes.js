import express from "express";
import { getUser, signin, SignOut, signup } from "../controllers/auth.controller.js";
import { protect } from "../../utils/protect.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/get-user", protect, getUser);
router.post("/sign-out", SignOut);


export default router;
