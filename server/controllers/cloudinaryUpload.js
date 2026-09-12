import { unlink } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import UserDB from "../models/userModel.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

// Best-effort removal of multer's temp file; the upload already succeeded or failed by now.
const removeTempFile = (path) => unlink(path).catch(() => {});

// @route POST /in/add — replace the logged-in user's profile photo (multipart field "photo")
const uploadPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No photo uploaded" });
  }

  try {
    const user = await UserDB.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, { folder: "workplace/profile" });
    user.photo = result.secure_url;
    await user.save();
    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Photo upload failed" });
  } finally {
    await removeTempFile(req.file.path);
  }
};

export default uploadPhoto;
