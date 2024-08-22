import { Router } from "express";
import nodemailer from "nodemailer";

export const emailRouter = Router();

emailRouter.post("/send", async (req, res) => {
  const transport = {
    service: "gmail",
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "<user email>",
      pass: process.env.SMTP_PASSWORD || "<user password>",
    },
  };

  let transporter = nodemailer.createTransport(transport);

  transporter.sendMail({
    from: req.body.email,
    to: req.body.email,
    subject: req.body.subject,
    text: req.body.message
  })
  res.send({
    email: req.body.email,
    message: req.body.message,
    subject: req.body.subject,
  });
});