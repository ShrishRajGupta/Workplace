// Mounted at /in — profile editing for the logged-in user, plus the public dashboard
import { Router } from "express";
import authenticateToken from "../middlewares/validateJWT.js";
import { photoUpload } from "../middlewares/upload.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadPhoto } from "../controllers/uploadController.js";
import {
  addEducation,
  addSkills,
  addWorkEx,
  getDashboard,
  getResume,
  removeEducation,
  removeSkill,
  removeWorkEx,
  saveResume,
  updateInfo,
} from "../controllers/profileController.js";

const router = Router();

// Writes target req.user, never a user named in the URL. The optional :username segment is
// kept only so older clients keep working; it is ignored.
router.post("/add", authenticateToken, photoUpload, asyncHandler(uploadPhoto));
router.post("/update/:username?", authenticateToken, asyncHandler(updateInfo));
router.post("/addCollege/:username?", authenticateToken, asyncHandler(addEducation));
router.post("/addWorkEx/:username?", authenticateToken, asyncHandler(addWorkEx));
router.post("/addSkills/:username?", authenticateToken, asyncHandler(addSkills));
router.delete("/education/:entryId", authenticateToken, asyncHandler(removeEducation));
router.delete("/workEx/:entryId", authenticateToken, asyncHandler(removeWorkEx));
router.delete("/skills/:entryId", authenticateToken, asyncHandler(removeSkill));

router.get("/resume", authenticateToken, asyncHandler(getResume));
router.put("/resume", authenticateToken, asyncHandler(saveResume));

router.get("/:username", asyncHandler(getDashboard));

export default router;
