// Introductory email to newly registered users
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from 'ejs'
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// @route = /email/intro
const sendIntroEmail = async (req, res) => {
  const { userEmail, userName } = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    ejs.renderFile(`${__dirname}/../../views/Templates/intro.ejs`,
      { name: userName },
      function (err, data) {
        if (err) {
          console.log(err);
        } else {
          var mainOptions = {
            from: process.env.GMAIL_USER,
            to: userEmail,
            subject: "Welcome to our website",
            html: data,
          };
          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              console.log(err);
            } else {
              console.log("Message sent: " + info);
            }
          });
        }
      }
    );
    res.status(200).json({ message: "Email sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { sendIntroEmail };
