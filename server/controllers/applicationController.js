import { unlink } from "fs/promises";
import Application from "../models/Application.js";
import JobPost from "../models/postModel.js";
import HttpError from "../utils/httpError.js";
import { uploadTempFile } from "./uploadController.js";

const idsEqual = (a, b) => String(a) === String(b);

// @route GET /user/posts/:postId — one job post with its poster
export const getPost = async (req, res) => {
  const post = await JobPost.findById(req.params.postId).populate("user_id", "username photo");
  if (!post) throw new HttpError(404, "Job post not found");
  res.status(200).json({ success: true, post });
};

// @route POST /user/posts/:postId/apply — multipart: fullName, email, phone, coverNote, resume(file)
export const applyToPost = async (req, res) => {
  const discardFile = () => req.file && unlink(req.file.path).catch(() => {});

  const post = await JobPost.findById(req.params.postId);
  if (!post) {
    await discardFile();
    throw new HttpError(404, "Job post not found");
  }
  if (idsEqual(post.user_id, req.user.id)) {
    await discardFile();
    throw new HttpError(400, "You cannot apply to your own post");
  }
  if (await Application.exists({ post: post._id, applicant: req.user.id })) {
    await discardFile();
    throw new HttpError(409, "You have already applied to this job");
  }

  const { fullName, email, phone, coverNote } = req.body;
  if (!fullName || !email) {
    await discardFile();
    throw new HttpError(400, "fullName and email are required");
  }

  let resumeUrl = "";
  if (req.file) {
    const uploaded = await uploadTempFile(req.file, { folder: "workplace/resumes", resource_type: "raw" });
    resumeUrl = uploaded.secure_url;
  }

  const application = await Application.create({
    post: post._id,
    applicant: req.user.id,
    employer: post.user_id,
    fullName,
    email,
    phone,
    coverNote,
    resumeUrl,
  });
  res.status(201).json({ success: true, message: "Application sent", application });
};

// @route GET /user/posts/:postId/applicants — the post owner sees who applied
export const listApplicants = async (req, res) => {
  const post = await JobPost.findById(req.params.postId);
  if (!post) throw new HttpError(404, "Job post not found");
  if (!idsEqual(post.user_id, req.user.id)) throw new HttpError(403, "Only the poster can see applicants");

  const applications = await Application.find({ post: post._id })
    .populate("applicant", "username photo")
    .sort({ createdAt: -1 });
  res.status(200).json({ success: true, post, applications });
};

// @route GET /user/applications — jobs the logged-in user applied to
export const myApplications = async (req, res) => {
  const applications = await Application.find({ applicant: req.user.id })
    .populate("post", "jobTitle companyName jobLocation jobType workPlace")
    .sort({ createdAt: -1 });
  res.status(200).json({ success: true, applications });
};

// @route GET /user/posts/:postId/applications/count — used by the poster's own post cards
export const countApplicants = async (req, res) => {
  const post = await JobPost.findById(req.params.postId).select("user_id");
  if (!post) throw new HttpError(404, "Job post not found");
  if (!idsEqual(post.user_id, req.user.id)) throw new HttpError(403, "Only the poster can see applicants");
  const count = await Application.countDocuments({ post: post._id });
  res.status(200).json({ success: true, count });
};
