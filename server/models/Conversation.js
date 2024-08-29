<<<<<<< HEAD
import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
});

export default mongoose.model("Conversation",ConversationSchema);
=======
import { Schema, model } from "mongoose";

const ConversationSchema = new Schema({
    members:{
        type: Array
    }
},{
    timestamps:true
});
export default model("Conversation",ConversationSchema);
>>>>>>> 07b57c13b5588f2ba5b9899d3c94225d94e57b73
