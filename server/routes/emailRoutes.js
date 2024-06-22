import Router from "express";
import { sendIntroEmail } from "../controllers/emails/intro.js";
const emailRouter = Router();

// route begins with /email
// @route = /email/intro

emailRouter.route("/intro").post(sendIntroEmail);

export default emailRouter;