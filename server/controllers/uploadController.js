import { unlink } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import UserDB from "../models/userModel.js";
import HttpError from "../utils/httpError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

// @route POST /in/add — replace the logged-in user's profile photo (multipart field "photo")
export const uploadPhoto = async (req, res) => {
  if (!req.file) throw new HttpError(400, "No photo uploaded");
  try {
    const user = await UserDB.findById(req.user.id);
    if (!user) throw new HttpError(404, "User not found");

    const result = await cloudinary.uploader.upload(req.file.path, { folder: "workplace/profile" });
    user.photo = result.secure_url;
    await user.save();
    res.status(200).json({ success: true, url: result.secure_url });
  } finally {
    await unlink(req.file.path).catch(() => {}); // multer's temp file; best effort
  }
};
