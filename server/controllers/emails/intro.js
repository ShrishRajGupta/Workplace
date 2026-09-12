// Introductory email to newly registered users
import nodemailer from "nodemailer";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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
  const { email, username } = req.user;
  try {
    const html = await ejs.renderFile(TEMPLATE, { name: username });
    await getTransporter().sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Welcome to Workplace",
      html,
    });
    return res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Could not send email" });
  }
};

export { sendIntroEmail };
