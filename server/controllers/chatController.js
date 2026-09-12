import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import HttpError from "../utils/httpError.js";

const isMember = (conversation, userId) => conversation.members.some((m) => String(m) === String(userId));

const memberConversationOr403 = async (conversationId, userId) => {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation || !isMember(conversation, userId)) {
    throw new HttpError(403, "Not a member of this conversation");
  }
  return conversation;
};

// @route POST /conversations — start (or return the existing) conversation with receiverId
export const createConversation = async (req, res) => {
  const { receiverId } = req.body;
  if (!receiverId) throw new HttpError(400, "receiverId is required");
  const members = [String(req.user.id), String(receiverId)];

  const existing = await Conversation.findOne({ members: { $all: members } });
  if (existing) return res.status(200).json(existing);

  const created = await Conversation.create({ members });
  res.status(201).json(created);
};

// @route GET /conversations/:userId — the caller's conversations (:userId must be the caller)
export const listConversations = async (req, res) => {
  if (String(req.params.userId) !== String(req.user.id)) throw new HttpError(403, "Forbidden");
  const conversations = await Conversation.find({ members: { $in: [String(req.user.id)] } }).sort({ updatedAt: -1 });
  res.status(200).json(conversations);
};

// @route GET /conversations/find/:firstUserId/:secondUserId — one of the two must be the caller
export const findConversation = async (req, res) => {
  const { firstUserId, secondUserId } = req.params;
  const me = String(req.user.id);
  if (firstUserId !== me && secondUserId !== me) throw new HttpError(403, "Forbidden");
  const conversation = await Conversation.findOne({ members: { $all: [firstUserId, secondUserId] } });
  res.status(200).json(conversation);
};

// @route POST /messages — send a message as the caller
export const sendMessage = async (req, res) => {
  const { conversationId } = req.body;
  const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
  if (!conversationId || !text) throw new HttpError(400, "conversationId and text are required");

  await memberConversationOr403(conversationId, req.user.id);
  const message = await Message.create({ conversationId, sender: String(req.user.id), text });
  res.status(201).json(message);
};

// @route GET /messages/:conversationId — messages of a conversation the caller belongs to
export const listMessages = async (req, res) => {
  await memberConversationOr403(req.params.conversationId, req.user.id);
  const messages = await Message.find({ conversationId: req.params.conversationId }).sort({ createdAt: 1 });
  res.status(200).json(messages);
};
