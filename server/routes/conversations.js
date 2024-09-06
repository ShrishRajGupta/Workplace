import Router from "express";
const ConversationRoute = Router();
import Conversation from "../models/Conversation.js";

//new Conv
ConversationRoute.post("/",async (req,res)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId]  
    })

    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);  
    }catch(err){
        res.status(500).json(err);
    }
})
//get conv of user
ConversationRoute.get("/:userId",async (req,res)=>{
    
    try{

        const conversation = await Conversation.find({
            members:{ $in :[req.params.userId]}
        });
        res.status(200).json(conversation);
    }catch(err){
        res.status(500).json(err);
    }
})

// get conv includes two userId

ConversationRoute.get("/find/:firstUserId/:secondUserId", async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
export default ConversationRoute;