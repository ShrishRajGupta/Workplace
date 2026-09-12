// Introductory email to newly registered users
import nodemailer from "nodemailer";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import HttpError from "../../utils/httpError.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE = join(__dirname, "..", "..", "views", "Templates", "intro.ejs");

// One pooled transporter for the process instead of a new connection per request.
let transporter;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      pool: true,
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });
  }
  return transporter;
};

// @route POST /email/intro — welcome email to the logged-in user
const sendIntroEmail = async (req, res) => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
    throw new HttpError(503, "Email is not configured on this server");
  }
  const { email, username } = req.user;
  const html = await ejs.renderFile(TEMPLATE, { name: username });
  await getTransporter().sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Welcome to Workplace",
    html,
  });
  res.status(200).json({ success: true, message: "Email sent" });
};

export { sendIntroEmail };
