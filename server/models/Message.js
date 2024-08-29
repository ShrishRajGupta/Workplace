<<<<<<< HEAD
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: String,
    },
    sender: {
        type: String,
    },
    text: {
        type: String,
    },
});

export default mongoose.model("Message",MessageSchema);
=======
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
>>>>>>> 07b57c13b5588f2ba5b9899d3c94225d94e57b73
