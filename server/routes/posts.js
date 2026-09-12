// Mounted at / — job posts and search. Paths are the legacy ones the client calls.
import { Router } from "express";
import authenticateToken from "../middlewares/validateJWT.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createPost, listAllPosts, myPosts, search, userPosts } from "../controllers/postController.js";

const router = Router();

router.get("/home", asyncHandler(listAllPosts));
router.get("/search/:value", asyncHandler(search));
router.post("/user/jobpostform", authenticateToken, asyncHandler(createPost));
router.get("/user/allposts", authenticateToken, asyncHandler(myPosts));
router.get("/user/allposts/:userId", authenticateToken, asyncHandler(userPosts));

export default router;
