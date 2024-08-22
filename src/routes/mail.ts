import { Request, Response, Router } from "express";
import { emailAdaptor } from "../adapters/email-adapter";
import { userService } from "../domain/users-service";

export const emailRouter = Router();

emailRouter.post("/send", async (req, res) => {
  await emailAdaptor.sendEmail(req.body);

  res.send({
    email: req.body.email,
    message: req.body.message,
    subject: req.body.subject,
  });
});

emailRouter.get("/confirm", async (req: Request, res: Response) => {
  const code = req.query.code;
  
  if (!code) {
    res.sendStatus(404);
  }
  //@ts-ignore
  const result = await userService.confirmEmail(code);

  res.sendStatus(result ? 201 : 404);
});
