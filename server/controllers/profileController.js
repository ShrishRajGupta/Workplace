import UserDB from "../models/userModel.js";
import HttpError from "../utils/httpError.js";

const MAX_FIELD_LENGTH = 500;
const clean = (value) => (typeof value === "string" ? value.trim().slice(0, MAX_FIELD_LENGTH) : "");

const findMeOr404 = async (req) => {
  const user = await UserDB.findById(req.user.id);
  if (!user) throw new HttpError(404, "User not found");
  return user;
};

// @route GET /in/:username — public dashboard of a user
export const getDashboard = async (req, res) => {
  const user = await UserDB.findOne({ username: req.params.username });
  if (!user) throw new HttpError(404, "User not found");
  res.status(200).json({ success: true, message: "User retrieved", user });
};

// @route POST /in/update — name / about of the logged-in user
export const updateInfo = async (req, res) => {
  const name = clean(req.body.name);
  const about = clean(req.body.about);
  const user = await findMeOr404(req);
  if (name) user.name = name;
  if (about) user.about = about;
  await user.save();
  res.status(200).json({ success: true, message: "success", name: user.name, about: user.about });
};

// @route POST /in/addCollege — append an education entry
export const addEducation = async (req, res) => {
  const collegeName = clean(req.body.collegeName);
  if (!collegeName) throw new HttpError(400, "collegeName is required");
  const user = await findMeOr404(req);
  user.education.push({ collegeName, degree: clean(req.body.degree), year: clean(req.body.year) });
  await user.save();
  res.status(200).json({ success: true, message: "success", education: user.education });
};

// @route POST /in/addWorkEx — append a work-experience entry
export const addWorkEx = async (req, res) => {
  const companyName = clean(req.body.companyName);
  if (!companyName) throw new HttpError(400, "companyName is required");
  const user = await findMeOr404(req);
  user.workexperience.push({ companyName, year: clean(req.body.year) });
  await user.save();
  res.status(200).json({ success: true, message: "success", workexperience: user.workexperience });
};

// @route POST /in/addSkills — append a skill
export const addSkills = async (req, res) => {
  const description = clean(req.body.description);
  if (!description) throw new HttpError(400, "description is required");
  const user = await findMeOr404(req);
  user.skills.push({ description });
  await user.save();
  res.status(200).json({ success: true, message: "success", skills: user.skills });
};

// DELETE /in/education/:entryId, /in/workEx/:entryId, /in/skills/:entryId — remove one entry
const removeEntry = (field) => async (req, res) => {
  const user = await findMeOr404(req);
  const entry = user[field].id(req.params.entryId);
  if (!entry) throw new HttpError(404, "Entry not found");
  entry.deleteOne();
  await user.save();
  res.status(200).json({ success: true, message: "Removed", [field]: user[field] });
};
export const removeEducation = removeEntry("education");
export const removeWorkEx = removeEntry("workexperience");
export const removeSkill = removeEntry("skills");

// @route GET /in/resume — the logged-in user's saved resume builder state (or null)
export const getResume = async (req, res) => {
  const user = await findMeOr404(req);
  res.status(200).json({ success: true, resume: user.resume ?? null });
};

// @route PUT /in/resume — body { information, color }
const MAX_RESUME_BYTES = 200 * 1024;
export const saveResume = async (req, res) => {
  const { information, color } = req.body || {};
  if (!information || typeof information !== "object") throw new HttpError(400, "information is required");
  if (JSON.stringify(information).length > MAX_RESUME_BYTES) throw new HttpError(413, "Resume is too large");
  const user = await findMeOr404(req);
  user.resume = { information, color: typeof color === "string" ? color : "", updatedAt: new Date() };
  user.markModified("resume");
  await user.save();
  res.status(200).json({ success: true, resume: user.resume });
};
