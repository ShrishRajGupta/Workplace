// Mounted at /user — profiles and connections. Every route requires a logged-in user.
import { Router } from "express";
import authenticateToken from "../middlewares/validateJWT.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createProfile,
  getMyProfile,
  getUserById,
  listFriends,
  respondFriendRequest,
  sendFriendRequest,
} from "../controllers/userController.js";

const router = Router();
router.use(authenticateToken);

router.post("/createProfile", asyncHandler(createProfile));
router.get("/profile", asyncHandler(getMyProfile));
router.get("/profile/:userId/connect", asyncHandler(sendFriendRequest));
router.get("/profile/:userId", asyncHandler(getUserById));
router.put("/connect/:userId/:friendsId/:status/:requestId", asyncHandler(respondFriendRequest));
router.get("/friends/:userId", asyncHandler(listFriends));
router.get("/:userId", asyncHandler(getUserById));

export default router;
