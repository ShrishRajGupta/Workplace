import { Express } from "express";
import Conversation from "../models/Conversation";

const router = Express.Router();

//Add a conversation
router.post("/",async (req,res)=>{

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }
    catch(err){
        res.status(500).json(err);
    }
});


//Get all conversations related to a user
router.get("/:userId",async (req,res)=>{
    
    try{
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        })

        res.status(200).json(conversation);
    }
    catch(err){
        res.status(500).json(err);
    }
})

export default router;