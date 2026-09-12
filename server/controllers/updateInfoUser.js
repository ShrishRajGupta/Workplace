import UserDB from "../models/userModel.js";

const MAX_FIELD_LENGTH = 500;

const cleanString = (value) => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
};

// Loads the logged-in user or sends a 404. Returns null when a response was already sent.
const loadCurrentUser = async (req, res) => {
  const user = await UserDB.findById(req.user.id);
  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
    return null;
  }
  return user;
};

// @route POST /in/update — update name / about of the logged-in user
const updateInfo = async (req, res) => {
  const name = cleanString(req.body.name);
  const about = cleanString(req.body.about);
  try {
    const user = await loadCurrentUser(req, res);
    if (!user) return;
    if (name) user.name = name;
    if (about) user.about = about;
    await user.save();
    return res.status(200).json({ message: "success", name: user.name, about: user.about });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @route POST /in/addCollege — append an education entry
const addEducation = async (req, res) => {
  const collegeName = cleanString(req.body.collegeName);
  const degree = cleanString(req.body.degree);
  const year = cleanString(req.body.year);
  if (!collegeName) {
    return res.status(400).json({ success: false, message: "collegeName is required" });
  }
  try {
    const user = await loadCurrentUser(req, res);
    if (!user) return;
    user.education.push({ collegeName, degree, year });
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @route POST /in/addWorkEx — append a work-experience entry
const addWorkEx = async (req, res) => {
  const companyName = cleanString(req.body.companyName);
  const year = cleanString(req.body.year);
  if (!companyName) {
    return res.status(400).json({ success: false, message: "companyName is required" });
  }
  try {
    const user = await loadCurrentUser(req, res);
    if (!user) return;
    user.workexperience.push({ companyName, year });
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// @route POST /in/addSkills — append a skill
const addSkills = async (req, res) => {
  const description = cleanString(req.body.description);
  if (!description) {
    return res.status(400).json({ success: false, message: "description is required" });
  }
  try {
    const user = await loadCurrentUser(req, res);
    if (!user) return;
    user.skills.push({ description });
    await user.save();
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export { updateInfo, addEducation, addWorkEx, addSkills };
