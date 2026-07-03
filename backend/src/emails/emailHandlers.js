import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import nodemailer from "nodemailer";
import { ENV } from "../lib/env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.NODEMAILER_EMAIL,
    pass: ENV.NODEMAILER_PASSWORD,
  },
});

const sender = ENV.NODEMAILER_EMAIL;


export const sendWelcomeEmail = async (email, name, clientURL) => {

  const mailOptions = {
    from: `"TalkLoop" <${sender}>`,
    to: email,
    subject: "Welcome to TalkLoop!",
    text: `Hello ${name},\n\nWelcome to TalkLoop! We're excited to have you on board`,
    html: createWelcomeEmailTemplate(name, clientURL),
  };

  await transporter.sendMail(mailOptions)
};