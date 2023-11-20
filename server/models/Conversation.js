import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema({
    members: {
        type: Array,
    },
});

export default mongoose.model("Conversation",ConversationSchema);