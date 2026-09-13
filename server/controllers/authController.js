import bcrypt from "bcrypt";
import UserDB from "../models/userModel.js";
import HttpError from "../utils/httpError.js";
import { signToken } from "../utils/token.js";
import { authCookieOptions, clearAuthCookieOptions } from "../utils/cookieOptions.js";

const SALT_ROUNDS = 10;
const DEFAULT_PHOTO = "/images/person/noAvatar.png"; // served from client/public

// @route POST /user/register
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    throw new HttpError(400, "username, email and password are required");
  }

  const existing = await UserDB.findOne({ $or: [{ email }, { username }] });
  if (existing) {
    const field = existing.email === String(email).toLowerCase() ? "email" : "username";
    throw new HttpError(409, `An account with that ${field} already exists`);
  }

  const member = await UserDB.create({
    username,
    email,
    password: await bcrypt.hash(password, SALT_ROUNDS),
    photo: DEFAULT_PHOTO,
  });

  res
    .cookie("authorization", signToken(member), authCookieOptions)
    .status(201)
    .json({ success: true, message: "Registration successful", user: member });
};

// @route POST /user/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new HttpError(400, "email and password are required");

  const user = await UserDB.findOne({ email }).select("+password");
  if (!user) throw new HttpError(401, "No account with that email; please register first");

  const matches = await bcrypt.compare(password, user.password);
  if (!matches) throw new HttpError(401, "Invalid password");

  res
    .cookie("authorization", signToken(user), authCookieOptions)
    .status(200)
    .json({ success: true, message: "Logged in successfully", user });
};

// @route GET /user/logout
export const logoutUser = (req, res) => {
  res
    .clearCookie("authorization", clearAuthCookieOptions)
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};
