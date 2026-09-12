// @route = /in  — profile editing for the logged-in user
import { Router } from "express";
import multer from "multer";
import authenticateToken from "../middlewares/validateJWT.js";
import uploadPhoto from "../controllers/cloudinaryUpload.js";
import { getDashboard } from "../controllers/userController.js";
import { addEducation, addSkills, addWorkEx, updateInfo } from "../controllers/updateInfoUser.js";

const upgradeRouter = Router();

const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: MAX_PHOTO_BYTES },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_PHOTO_TYPES.includes(file.mimetype)) return cb(null, true);
    cb(new Error("Only JPEG and PNG images are allowed"));
  },
});

// Turns multer's errors (bad type, too large) into a 400 instead of a bare 500.
const photoUpload = (req, res, next) =>
  uploader.single("photo")(req, res, (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    next();
  });

// Every write below targets the logged-in user (req.user), never a user named in the URL.
// The :username segment is kept only so existing clients keep working; it is ignored.
upgradeRouter.post("/add", authenticateToken, photoUpload, uploadPhoto);
upgradeRouter.post("/update/:username?", authenticateToken, updateInfo);
upgradeRouter.post("/addCollege/:username?", authenticateToken, addEducation);
upgradeRouter.post("/addWorkEx/:username?", authenticateToken, addWorkEx);
upgradeRouter.post("/addSkills/:username?", authenticateToken, addSkills);

upgradeRouter.get("/:username", getDashboard);

export default upgradeRouter;
