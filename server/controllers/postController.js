import JobPost from "../models/postModel.js";
import UserDB from "../models/userModel.js";
import HttpError from "../utils/httpError.js";
import escapeRegex from "../utils/escapeRegex.js";

const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;
const MAX_SEARCH_USERS = 20;
const MAX_SEARCH_POSTS = 50;

// @route POST /user/jobpostform — create a job post owned by the logged-in user
export const createPost = async (req, res) => {
  const { jobTitle, companyName, workPlace, jobLocation, jobType, salary } = req.body;
  if (!jobTitle || !companyName) throw new HttpError(400, "jobTitle and companyName are required");

  const owner = await UserDB.findById(req.user.id);
  if (!owner) throw new HttpError(404, "User not found");

  const post = await JobPost.create({
    user_id: owner._id,
    jobTitle,
    companyName,
    workPlace,
    jobLocation,
    jobType,
    salary: salary === "" || salary === undefined ? undefined : Number(salary),
  });
  await UserDB.updateOne({ _id: owner._id }, { $addToSet: { posts: post._id } });

  res.status(201).json({ success: true, message: "Post created successfully", post });
};

// @route GET /home?page=1&limit=20 — newest posts first, paginated
export const listAllPosts = async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(MAX_PAGE_SIZE, Math.max(1, Number(req.query.limit) || DEFAULT_PAGE_SIZE));
  const [posts, total] = await Promise.all([
    JobPost.find({}).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    JobPost.countDocuments(),
  ]);
  res.status(200).json({ success: true, message: "Posts retrieved", posts, page, limit, total });
};

// @route GET /user/allposts — the logged-in user's posts
export const myPosts = async (req, res) => {
  const allposts = await JobPost.find({ user_id: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, message: "Posts retrieved", allposts });
};

// @route GET /user/allposts/:userId — any user's posts
export const userPosts = async (req, res) => {
  const allposts = await JobPost.find({ user_id: req.params.userId }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, message: "Posts retrieved", allposts });
};

// @route GET /search/:value?jobTitle=&companyName=&jobLocation=&workPlace=&jobType=
// Users matching :value by username, and posts matching the optional filters (or :value
// against jobTitle when no filter is given). Returned separately so callers can tell them apart.
export const search = async (req, res) => {
  const value = escapeRegex(req.params.value);
  const { jobTitle, companyName, jobLocation, workPlace, jobType } = req.query;

  const postFilter = {};
  if (jobTitle) postFilter.jobTitle = { $regex: escapeRegex(jobTitle), $options: "i" };
  if (companyName) postFilter.companyName = { $regex: escapeRegex(companyName), $options: "i" };
  if (jobLocation) postFilter.jobLocation = { $regex: escapeRegex(jobLocation), $options: "i" };
  if (workPlace) postFilter.workPlace = workPlace;
  if (jobType) postFilter.jobType = jobType;
  if (Object.keys(postFilter).length === 0) postFilter.jobTitle = { $regex: value, $options: "i" };

  const [users, posts] = await Promise.all([
    UserDB.find({ username: { $regex: value, $options: "i" } }).limit(MAX_SEARCH_USERS),
    JobPost.find(postFilter).limit(MAX_SEARCH_POSTS),
  ]);

  res.status(200).json({ success: true, message: "Search results", user: users, posts });
};
