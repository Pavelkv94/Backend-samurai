import { Router } from "express";
import { emailAdaptor } from "../adapters/email-adapter";

export const emailRouter = Router();

emailRouter.post("/send", async (req, res) => {
  await emailAdaptor.sendEmail(req.body);

  res.send({
    email: req.body.email,
    message: req.body.message,
    subject: req.body.subject,
  });
});
