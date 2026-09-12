import api from "./client";

export const getConversations = (userId) => api.get(`/conversations/${userId}`).then((r) => r.data);
export const findConversation = (firstUserId, secondUserId) =>
  api.get(`/conversations/find/${firstUserId}/${secondUserId}`).then((r) => r.data);
export const createConversation = (receiverId) => api.post("/conversations", { receiverId }).then((r) => r.data);
export const getMessages = (conversationId) => api.get(`/messages/${conversationId}`).then((r) => r.data);
export const sendMessage = ({ conversationId, text }) =>
  api.post("/messages", { conversationId, text }).then((r) => r.data);
