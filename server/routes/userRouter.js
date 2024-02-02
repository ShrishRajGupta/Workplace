// @route = /in
import { Router } from "express";
const upgradeRouter = Router();
import UserDB from "../models/userModel.js";

import {
  getDashboard,
  populateDashboard,
} from "../controllers/userController.js";
import { updateInfo } from "../controllers/updateInfoUser.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

upgradeRouter.route("/add").post(upload.single("photo"), async (req, res) => {
  // const {name} = req.body;
  const photo = req.file.filename;

  const user = await UserDB.findOne({ username: "testing" });
  if (!user) return res.status(404).json({ msg: "User not found" });
  user.photo = photo;

  await user
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route = /in
upgradeRouter.route("/:username").get(getDashboard);

upgradeRouter.route("/update/:username").post(updateInfo);

upgradeRouter.route("/populate").post(populateDashboard);

// upgradeRouter.get("/profile/:id", userController.getProfileById);

export default upgradeRouter;
