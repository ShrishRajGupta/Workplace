import { Schema, model } from "mongoose";

export const APPLICATION_STATUSES = ["submitted", "reviewed", "shortlisted", "rejected"];

const ApplicationSchema = new Schema(
  {
    post: { type: Schema.Types.ObjectId, ref: "JobPost", required: true, index: true },
    applicant: { type: Schema.Types.ObjectId, ref: "UserDB", required: true, index: true },
    employer: { type: Schema.Types.ObjectId, ref: "UserDB", required: true, index: true },
    fullName: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "", trim: true, maxlength: 40 },
    coverNote: { type: String, default: "", trim: true, maxlength: 2000 },
    resumeUrl: { type: String, default: "" },
    status: { type: String, enum: APPLICATION_STATUSES, default: "submitted" },
  },
  { timestamps: true }
);

// One application per person per post.
ApplicationSchema.index({ post: 1, applicant: 1 }, { unique: true });

export default model("Application", ApplicationSchema);
