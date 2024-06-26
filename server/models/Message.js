import { Schema, model } from "mongoose";

const MessageSchema = new Schema({
    conversationId:{
        type:String
    },
    sender:{
        type:String
    },
    text:{
        type:String
    }
},{
    timestamps:true
});
export default model("Message",MessageSchema);