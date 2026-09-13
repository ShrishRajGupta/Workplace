// Mounted at /email
import { Router } from "express";
import authenticateToken from "../middlewares/validateJWT.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendIntroEmail } from "../controllers/emails/intro.js";

const router = Router();

// Welcome email to the logged-in user. The recipient comes from the token, never the body.
router.post("/intro", authenticateToken, asyncHandler(sendIntroEmail));

export default router;
