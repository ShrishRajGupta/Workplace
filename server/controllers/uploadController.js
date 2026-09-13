import { unlink } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import UserDB from "../models/userModel.js";
import HttpError from "../utils/httpError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

export const isCloudinaryConfigured = () =>
  Boolean(process.env.CLOUDINARY_CLOUDNAME && process.env.CLOUDINARY_APIKEY && process.env.CLOUDINARY_APISECRET);

// Uploads a multer temp file to Cloudinary and always removes the temp file afterwards.
export const uploadTempFile = async (file, options) => {
  if (!isCloudinaryConfigured()) throw new HttpError(503, "File uploads are not configured on this server");
  try {
    return await cloudinary.uploader.upload(file.path, options);
  } finally {
    await unlink(file.path).catch(() => {});
  }
};

// @route POST /in/add — replace the logged-in user's profile photo (multipart field "photo")
export const uploadPhoto = async (req, res) => {
  if (!req.file) throw new HttpError(400, "No photo uploaded");
  const user = await UserDB.findById(req.user.id);
  if (!user) {
    await unlink(req.file.path).catch(() => {});
    throw new HttpError(404, "User not found");
  }
  const result = await uploadTempFile(req.file, { folder: "workplace/profile" });
  user.photo = result.secure_url;
  await user.save();
  res.status(200).json({ success: true, url: result.secure_url });
};
