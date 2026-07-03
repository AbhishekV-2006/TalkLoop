// import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js";
import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL, // your Gmail address
    pass: process.env.NODEMAILER_PASSWORD, // your Gmail password or app password
  },
});


export const sendWelcomeEmail = async (email, name, clientURL) => {

  const mailOptions = {
    from: `"TalkLoop" <talkloop@talkloop.com>`,
    to: email,
    subject: "Welcome to TalkLoop!",
    text: `Hello ${name},\n\nWelcome to TalkLoop! We're excited to have you on board`,
    html: createWelcomeEmailTemplate(name, clientURL),
  };

  await transporter.sendMail(mailOptions)

  // const { data, error } = await resendClient.emails.send({
  //   from: `${sender.name} <${sender.email}>`,
  //   to: email,
  //   subject: "Welcome to TalkLoop!",
  //   html: createWelcomeEmailTemplate(name, clientURL),
  // });

  // if (error) {
  //   console.error("Error sending welcome email:", error);
  //   throw new Error("Failed to send welcome email");
  // }

  // console.log("Welcome Email sent successfully", data);
};