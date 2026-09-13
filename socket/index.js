require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie");

const PORT = Number(process.env.PORT) || 8900;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const JWT_SECRET = process.env.ACCESS_TOKEN;

if (!JWT_SECRET) {
  console.error("[fatal] ACCESS_TOKEN is required (same value as the API server) so socket connections can be verified");
  process.exit(1);
}

// credentials:true lets the browser send the httpOnly auth cookie with the handshake.
const io = require("socket.io")(PORT, { cors: { origin: CLIENT_URL, credentials: true } });
console.log(`Socket server listening on ${PORT}, allowing origin ${CLIENT_URL}`);

// Identify the user from the API's auth cookie (or an explicit auth token for non-browser clients).
io.use((socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.authorization || socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication required"));
    const { user } = jwt.verify(token, JWT_SECRET);
    socket.data.userId = String(user.id);
    return next();
  } catch (err) {
    return next(new Error("Invalid or expired token"));
  }
});

// userId -> socketId. A reconnect replaces the stale socket id instead of keeping the dead one.
const online = new Map();
const presence = () => [...online].map(([userId, socketId]) => ({ userId, socketId }));

io.on("connection", (socket) => {
  const userId = socket.data.userId;
  online.set(userId, socket.id);
  io.emit("getUsers", presence());

  // Deliver a message the sender has already persisted through the REST API.
  socket.on("sendMessage", ({ receiverId, text, conversationId } = {}) => {
    const target = online.get(String(receiverId));
    if (!target || typeof text !== "string" || !text.trim()) return;
    io.to(target).emit("getMessage", {
      senderId: userId,
      text,
      conversationId,
      createdAt: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    if (online.get(userId) === socket.id) online.delete(userId);
    io.emit("getUsers", presence());
  });
});
