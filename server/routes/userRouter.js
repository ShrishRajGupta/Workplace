
import { Router } from "express";
const userRouter = Router();

import { getDashboard,populateDashboard } from "../controllers/userController.js";
import { updateInfo } from "../controllers/updateInfoUser.js";

// @route = /in
userRouter.route("/:username")
    .get(getDashboard)

userRouter.route("/update/:username/:typeId")
    .patch(updateInfo);



userRouter.route("/populate")
    .post(populateDashboard);

// userRouter.get("/profile/:id", userController.getProfileById);


export default userRouter;
