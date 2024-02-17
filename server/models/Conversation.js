import { Schema, model } from "mongoose";

const ConversationSchema = new Schema({
    members:{
        type: Array
    }
},{
    timestamps:true
});
export default model("Conversation",ConversationSchema);