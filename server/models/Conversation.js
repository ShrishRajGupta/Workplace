import { Schema, model } from "mongoose";

// members are stored as id strings (historical data); `ref` still lets them be populated.
const ConversationSchema = new Schema(
  {
    members: { type: [{ type: String, ref: "UserDB" }], required: true, index: true },
  },
  { timestamps: true }
);

export default model("Conversation", ConversationSchema);
