import { Express } from "express";
import Message from "../models/Message";

const router = Express.Router();

//Save message corresponding to a particular conversation Id
router.post("/", async (req,res)=>{

    const message = new Message(req.body);

    try{
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Get the messages with the help of conversation Id..
router.get("/:conversationId", async(req,res)=>{
    
    try{

        const message = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(500).json(message);
    }
    catch(err){
        res.status(500).json(err);
    }
});

export default router;