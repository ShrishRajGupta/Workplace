import dotenv from 'dotenv';

dotenv.config();
import express ,{static as stat, json as _json } from "express";
import urlencoded from "body-parser";
import cookieParser from "cookie-parser";


const PORT = 3001;
const app = express();
import loginRouter from './routes/loginRouter.js';
import userRouter from './routes/userRoutes.js';
import mainRouter from './routes/mainRoutes.js';

// DB
import connectDB from "./config/conn.js";
connectDB();


// middleware & statics
app.use(stat('public'));
app.use(_json());
// Body-parser middleware
app.use(urlencoded({ extended: true }))
app.use(_json())
app.use(cookieParser());


// routes
app.use('/',mainRouter);
app.use('/user',loginRouter);
app.use('/user',userRouter);

//404 route
app.use((req, res) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
    }
);
