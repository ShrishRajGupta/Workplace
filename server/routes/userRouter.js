
import { Router } from "express";
const userRouter = Router();

import { getDashboard,populateDashboard } from "../controllers/userController.js";


userRouter.route("/:username")
    .get(getDashboard)

userRouter.route("/populate")
    .post(populateDashboard);
// userRouter.get("/profile/:id", userController.getProfileById);


export default userRouter;
