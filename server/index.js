import dotenv from 'dotenv';

dotenv.config();
import express ,{static as stat, json as _json } from "express";
import urlencoded from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from 'http';
import {Server}from 'socket.io';


const PORT = 3001;
const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin: '*',
    }
});
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

//Socket Connection
const users=[{}];
io.on("connection",(socket)=>{
    console.log("New Connection");

    socket.on('joined',({user})=>{
        console.log(user);
          users[socket.id]=user;
          console.log(`${user} has joined `);
          socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
          socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })

    socket.on('message',({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id});
    })

    socket.on('dissconnect',()=>{
          socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
        console.log(`user left`);
    })
});

// routes
app.use('/',mainRouter);
app.use('/user',loginRouter);
app.use('/user',userRouter);

//404 route
app.use((req, res) => {
    res.status(404).send("Sorry can't find that!")
})

httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`);
    }
);
