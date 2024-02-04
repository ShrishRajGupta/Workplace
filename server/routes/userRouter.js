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
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET 
});

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

upgradeRouter.route("/add").post(uploader.single("photo"), async (req, res) => {
  // const {name} = req.body;
  const id=req.body.user;
  const photo = req.file.filename;

  const user = await UserDB.findOne({ _id:id });
  if (!user) 
  return res.status(404).json({ msg: "User not found" });
  else{
    const upload= await cloudUp(req.file.path);
    user.photo = upload.secure_url;  
    await user
    .save()
    .then(() => res.json("User Added"))
    .catch((err) => res.status(400).json("Error: " + err));
  }
});


const cloudUp = async(filepath)=>{
  try {
    const result = await cloudinary.uploader.upload(filepath);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }

}

// @route = /in
upgradeRouter.route("/:username").get(getDashboard);

upgradeRouter.route("/update/:username").post(updateInfo);

upgradeRouter.route("/populate").post(populateDashboard);

// upgradeRouter.get("/profile/:id", userController.getProfileById);

export default upgradeRouter;
