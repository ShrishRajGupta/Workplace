import Router from "express";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";
import authenticateToken from "../middlewares/validateJWT.js";

const messageRoute = Router();

// All message routes require a logged-in user who is a member of the conversation.
messageRoute.use(authenticateToken);

const MAX_MESSAGE_LENGTH = 2000;

const loadMemberConversation = async (conversationId, userId) => {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) return null;
  const member = conversation.members.some((m) => String(m) === String(userId));
  return member ? conversation : null;
};

// @route POST /messages — send a message as the logged-in user
messageRoute.post("/", async (req, res) => {
  const { conversationId } = req.body;
  const text = typeof req.body.text === "string" ? req.body.text.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
  if (!conversationId || !text) {
    return res.status(400).json({ success: false, message: "conversationId and text are required" });
  }
  try {
    const conversation = await loadMemberConversation(conversationId, req.user.id);
    if (!conversation) {
      return res.status(403).json({ success: false, message: "Not a member of this conversation" });
    }
    const saved = await new Message({ conversationId, sender: req.user.id, text }).save();
    return res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Could not send message" });
  }
});

// @route GET /messages/:conversationId — messages of a conversation the caller belongs to
messageRoute.get("/:conversationId", async (req, res) => {
  try {
    const conversation = await loadMemberConversation(req.params.conversationId, req.user.id);
    if (!conversation) {
      return res.status(403).json({ success: false, message: "Not a member of this conversation" });
    }
    const messages = await Message.find({ conversationId: req.params.conversationId }).sort({ createdAt: 1 });
    return res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Could not load messages" });
  }
});

export default messageRoute;
