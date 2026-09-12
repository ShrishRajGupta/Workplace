import Router from "express";
import authenticateToken from "../middlewares/validateJWT.js";
import { sendIntroEmail } from "../controllers/emails/intro.js";

const emailRouter = Router();

// @route POST /email/intro — send the welcome email to the logged-in user (recipient comes
// from the token, never from the request body, so this cannot be used to mail third parties).
emailRouter.post("/intro", authenticateToken, sendIntroEmail);

export default emailRouter;
