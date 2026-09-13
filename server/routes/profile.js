// Mounted at /in — profile editing for the logged-in user, plus the public dashboard
import { Router } from "express";
import multer from "multer";
import authenticateToken from "../middlewares/validateJWT.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadPhoto } from "../controllers/uploadController.js";
import { addEducation, addSkills, addWorkEx, getDashboard, updateInfo } from "../controllers/profileController.js";

const router = Router();

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const photoUpload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: MAX_PHOTO_BYTES },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_PHOTO_TYPES.includes(file.mimetype)) return cb(null, true);
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "Only JPEG and PNG images are allowed"));
  },
}).single("photo");

// Writes target req.user, never a user named in the URL. The optional :username segment is
// kept only so the current client keeps working; it is ignored.
router.post("/add", authenticateToken, photoUpload, asyncHandler(uploadPhoto));
router.post("/update/:username?", authenticateToken, asyncHandler(updateInfo));
router.post("/addCollege/:username?", authenticateToken, asyncHandler(addEducation));
router.post("/addWorkEx/:username?", authenticateToken, asyncHandler(addWorkEx));
router.post("/addSkills/:username?", authenticateToken, asyncHandler(addSkills));

router.get("/:username", asyncHandler(getDashboard));

export default router;
