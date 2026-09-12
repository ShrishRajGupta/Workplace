import Router from "express";
import Conversation from "../models/Conversation.js";
import authenticateToken from "../middlewares/validateJWT.js";

const ConversationRoute = Router();

// All conversation routes require a logged-in user and only expose that user's own threads.
ConversationRoute.use(authenticateToken);

const isMember = (conversation, userId) =>
  conversation.members.some((m) => String(m) === String(userId));

// @route POST /conversations — start a conversation between the logged-in user and receiverId
ConversationRoute.post("/", async (req, res) => {
  const senderId = req.user.id;
  const { receiverId } = req.body;
  if (!receiverId) {
    return res.status(400).json({ success: false, message: "receiverId is required" });
  }
  try {
    const existing = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
    if (existing) return res.status(200).json(existing);

    const saved = await new Conversation({ members: [senderId, receiverId] }).save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Could not create conversation" });
  }
});

// @route GET /conversations/:userId — the logged-in user's conversations (userId must be self)
ConversationRoute.get("/:userId", async (req, res) => {
  if (String(req.params.userId) !== String(req.user.id)) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  try {
    const conversations = await Conversation.find({ members: { $in: [req.user.id] } });
    return res.status(200).json(conversations);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Could not load conversations" });
  }
});

// @route GET /conversations/find/:firstUserId/:secondUserId — one of the two must be the caller
ConversationRoute.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  const { firstUserId, secondUserId } = req.params;
  const me = String(req.user.id);
  if (String(firstUserId) !== me && String(secondUserId) !== me) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  try {
    const conversation = await Conversation.findOne({ members: { $all: [firstUserId, secondUserId] } });
    if (!conversation || !isMember(conversation, me)) return res.status(200).json(null);
    return res.status(200).json(conversation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Could not find conversation" });
  }
});

export default ConversationRoute;
