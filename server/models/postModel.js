import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "UserDB", required: true, index: true },
    jobTitle: { type: String, required: [true, "jobTitle is required"], trim: true },
    companyName: { type: String, required: [true, "companyName is required"], trim: true },
    workPlace: { type: String, default: "", trim: true },
    jobLocation: { type: String, default: "", trim: true },
    jobType: { type: String, default: "", trim: true },
    salary: { type: Number, min: 0 },
  },
  {
    timestamps: true,
    // The model used to be called BlogDB; keep its collection so existing data stays readable.
    collection: "blogdbs",
  }
);

export default model("JobPost", postSchema);
