// conversationRoutes mounted at /conversations, messageRoutes at /messages.
// Both require a logged-in user; controllers enforce conversation membership.
import { Router } from "express";
import authenticateToken from "../middlewares/validateJWT.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createConversation,
  findConversation,
  listConversations,
  listMessages,
  sendMessage,
} from "../controllers/chatController.js";

export const conversationRoutes = Router();
conversationRoutes.use(authenticateToken);
conversationRoutes.post("/", asyncHandler(createConversation));
conversationRoutes.get("/find/:firstUserId/:secondUserId", asyncHandler(findConversation));
conversationRoutes.get("/:userId", asyncHandler(listConversations));

export const messageRoutes = Router();
messageRoutes.use(authenticateToken);
messageRoutes.post("/", asyncHandler(sendMessage));
messageRoutes.get("/:conversationId", asyncHandler(listMessages));
