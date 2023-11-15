// config.js
import dotenv from "dotenv";
dotenv.config();



import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from "cors";


const PORT = 3001;
const app = express();
import loginRouter from './routes/loginRouter.js';
import registerRouter from './routes/registerRouter.js';
import userRouter from './routes/userRouter.js';

// DB
import connectDB from "./config/conn.js";
connectDB();


// middleware & statics
app.use(cors());
app.use(express.static('public'))
app.use(express.json());
// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser());


// routes

app.use('/user', registerRouter);
app.use('/user',loginRouter );
app.use('/in',userRouter );


//404 route
app.use((req, res) => {
    res.status(404).send("Sorry can't find that!")
})

app.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
    }
);
