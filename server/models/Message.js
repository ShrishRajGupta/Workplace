import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
  {
    conversationId: { type: String, required: true, index: true },
    sender: { type: String, ref: "UserDB", required: true },
    text: { type: String, required: true, trim: true, maxlength: 2000 },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
