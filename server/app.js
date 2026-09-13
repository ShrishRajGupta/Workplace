import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { env } from "./config/env.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import profileRoutes from "./routes/profile.js";
import postRoutes from "./routes/posts.js";
import { conversationRoutes, messageRoutes } from "./routes/chat.js";
import emailRoutes from "./routes/email.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// credentials:true lets the browser send the httpOnly auth cookie on cross-origin calls;
// that requires a concrete origin, not "*".
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// Routes. Paths are the ones the current client calls; postRoutes is mounted before
// userRoutes so /user/allposts is matched before /user/:userId.
app.use("/user", authRoutes);
app.use("/", postRoutes);
app.use("/user", userRoutes);
app.use("/in", profileRoutes);
app.use("/conversations", conversationRoutes);
app.use("/messages", messageRoutes);
app.use("/email", emailRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
