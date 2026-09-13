import multer from "multer";
import HttpError from "../utils/httpError.js";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const uploader = (allowedTypes, rejectionMessage) =>
  multer({
    storage: multer.diskStorage({}), // OS temp dir; controllers delete the file after use
    limits: { fileSize: MAX_UPLOAD_BYTES },
    fileFilter: (req, file, cb) => {
      if (allowedTypes.includes(file.mimetype)) return cb(null, true);
      cb(new HttpError(400, rejectionMessage));
    },
  });

export const photoUpload = uploader(
  ["image/jpeg", "image/jpg", "image/png"],
  "Only JPEG and PNG images are allowed"
).single("photo");

export const resumeUpload = uploader(
  ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  "Resume must be a PDF or Word document"
).single("resume");
