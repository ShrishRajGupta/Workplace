import Router from "express";
const messageRoute = Router();
import Message from "../models/Message.js";

//add
messageRoute.post("/",async (req,res)=>{
    const newMessage = new Message(req.body);
    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err);
    }
})

//get
messageRoute.get("/:conversationId",async (req,res)=>{
    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        console.log(messages);
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err);
    }
})
export default messageRoute;