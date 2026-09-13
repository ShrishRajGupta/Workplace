// Mounted at / — job posts, applications and search. Paths are the legacy ones the client calls.
import { Router } from "express";
import authenticateToken from "../middlewares/validateJWT.js";
import { resumeUpload } from "../middlewares/upload.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createPost, listAllPosts, myPosts, search, userPosts } from "../controllers/postController.js";
import {
  applyToPost,
  countApplicants,
  getPost,
  listApplicants,
  myApplications,
} from "../controllers/applicationController.js";

const router = Router();

router.get("/home", asyncHandler(listAllPosts));
router.get("/search/:value", asyncHandler(search));
router.post("/user/jobpostform", authenticateToken, asyncHandler(createPost));
router.get("/user/allposts", authenticateToken, asyncHandler(myPosts));
router.get("/user/allposts/:userId", authenticateToken, asyncHandler(userPosts));

// Applications
router.get("/user/applications", authenticateToken, asyncHandler(myApplications));
router.get("/user/posts/:postId", authenticateToken, asyncHandler(getPost));
router.post("/user/posts/:postId/apply", authenticateToken, resumeUpload, asyncHandler(applyToPost));
router.get("/user/posts/:postId/applicants", authenticateToken, asyncHandler(listApplicants));
router.get("/user/posts/:postId/applications/count", authenticateToken, asyncHandler(countApplicants));

export default router;
