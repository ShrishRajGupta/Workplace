require("dotenv").config();

const PORT = Number(process.env.PORT) || 8900;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

const io = require("socket.io")(PORT, {
    cors:{
        origin: CLIENT_URL
    },
});
console.log(`Socket server listening on ${PORT}, allowing origin ${CLIENT_URL}`);
let users = [];

const addUser = (userId,socketId)=>{
    !users.some((user)=>(user.userId === userId)) && 
    users.push({userId,socketId});
}
const removeUser = (socketId)=>{
    users = users.filter((user)=>(user.socketId !== socketId));
}
const getUser = (userId) => {
    return users.find((user) => (user.userId === userId));
  };
  
io.on("connection",(socket)=>{
    console.log("user connected"+ socket.id);
    io.emit("welcome","Hello this is socket server");
    //take socketId and userId from client
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id);
        io.emit("getUsers",users);
    })
    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {

        const user = getUser(receiverId);
        console.log(users);

        io.to(user?.socketId).emit("getMessage", {
          senderId,
          text,
        });
      });
    

    //when disconnect
    socket.on("disconnect",()=>{
        console.log("user has disconnected");
        removeUser(socket.id);
        io.emit("getUsers",users);
    })
})
