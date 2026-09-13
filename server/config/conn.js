import mongoose from "mongoose";

// Connects to MongoDB. Rejects on failure so the caller can decide to exit; logs later
// connection drops instead of failing silently.
const connectDB = async (uri) => {
  mongoose.connection.on("error", (err) => console.error("[mongo] connection error:", err.message));
  mongoose.connection.on("disconnected", () => console.warn("[mongo] disconnected"));
  await mongoose.connect(uri);
  console.log("[mongo] connected");
};

export default connectDB;
