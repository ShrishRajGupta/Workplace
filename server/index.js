import dotenv from "dotenv";

dotenv.config();
import express, { static as stat, json as _json } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const PORT = 3001;
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
import loginRouter from "./routes/loginRouter.js";
import userRouter from "./routes/userRoutes.js";
import emailRouter from "./routes/emailRoutes.js";
import mainRouter from "./routes/mainRoutes.js";
import upgradeRouter from "./routes/userRouter.js";
import conversationRoute from "./routes/conversations.js"
import messageRoute from "./routes/messages.js";
// DB
import connectDB from "./config/conn.js";
connectDB();

// middleware & statics
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// template engine
app.set("view engine", "ejs");
app.set("views", "./views");

// routes
app.use("/", mainRouter);
app.use("/email", emailRouter);
app.use("/in", upgradeRouter);
app.use("/user", loginRouter);
app.use("/user", userRouter);

app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

//404 route
app.use((req, res) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}`);
});
