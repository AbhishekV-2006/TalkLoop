import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import nodemailer from "nodemailer";
import { ENV } from "../lib/env.js";

if (!ENV.NODEMAILER_EMAIL || !ENV.NODEMAILER_PASSWORD) {
  throw new Error("Nodemailer environment variables are missing");
}

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  connectionTimeout: 15000,
  greetingTimeout: 15000,
  auth: {
    user: ENV.NODEMAILER_EMAIL,
    pass: ENV.NODEMAILER_PASSWORD,
  },
});

const sender = ENV.NODEMAILER_EMAIL;

export const verifyMailer = async () => {
  await transporter.verify();
};


export const sendWelcomeEmail = async (email, name, clientURL) => {

  const mailOptions = {
    from: `"TalkLoop" <${sender}>`,
    to: email,
    subject: "Welcome to TalkLoop!",
    text: `Hello ${name},\n\nWelcome to TalkLoop! We're excited to have you on board`,
    html: createWelcomeEmailTemplate(name, clientURL),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent", info.messageId);
    return info;
  } catch (error) {
    console.error("Welcome email failed", error);
    throw error;
  }
};