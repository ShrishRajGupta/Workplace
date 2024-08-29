// @route = /in
import { Router } from "express";
const upgradeRouter = Router();
import uploadPhoto from "../controllers/cloudinaryUpload.js";

import {
  getDashboard,
  populateDashboard,
} from "../controllers/userController.js";
import { addEducation, addSkills, addWorkEx, updateInfo } from "../controllers/updateInfoUser.js";
import multer from "multer";

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let uploader = multer({ storage:multer.diskStorage({})
, fileFilter 
});

upgradeRouter.route("/add").post(uploader.single("photo"), uploadPhoto);

// @route = /in

upgradeRouter.route("/update/:username").post(updateInfo);
upgradeRouter.route("/addCollege/:username").post(addEducation);
upgradeRouter.route("/addWorkEx/:username").post(addWorkEx);
upgradeRouter.route("/addSkills/:username").post(addSkills);

upgradeRouter.route("/populate").post(populateDashboard);
upgradeRouter.route("/:username").get(getDashboard);

// upgradeRouter.get("/profile/:id", userController.getProfileById);

export default upgradeRouter;
