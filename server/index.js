import dotenv from 'dotenv';

dotenv.config();
import express ,{static as stat, json as _json } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = 3001;
const app = express();
app.use(cors());
import loginRouter from './routes/loginRouter.js';
import userRouter from './routes/userRoutes.js';
import mainRouter from './routes/mainRoutes.js';
import conversationRoute from "./routes/conversations.js"
import messageRoute from "./routes/messages.js";
// DB
import connectDB from "./config/conn.js";
connectDB();


// middleware & statics
app.use(stat('public'));
app.use(_json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());

// routes
app.use('/',mainRouter);
app.use('/user',loginRouter);
app.use('/user',userRouter);
app.use("/conversations", conversationRoute);
app.use("/messages", messageRoute);

//404 route
app.use((req, res) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
    }
);
