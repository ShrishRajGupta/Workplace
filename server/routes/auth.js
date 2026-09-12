// Mounted at /user — registration, login, logout
import { Router } from "express";
import asyncHandler from "../utils/asyncHandler.js";
import { loginUser, logoutUser, registerUser } from "../controllers/authController.js";

const router = Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));
router.get("/logout", logoutUser);

export default router;
