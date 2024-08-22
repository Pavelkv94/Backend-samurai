import { Request, Response, Router } from "express";
import { usersRepository } from "../db/usersRepository";
import { HTTP_STATUSES } from "../constants";
import { userService } from "../domain/users-service";
import { jwtService } from "../app/jwt-service";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await usersRepository.findUsers();

  res.status(HTTP_STATUSES.OK_200).json(users);
});

userRouter.post("/", async (req, res) => {
  const payload = req.body;
  const newUser = await userService.createUser(payload.login, payload.password);

  res.json(newUser);
});

userRouter.post("/login", async (req: Request, res: Response) => {
  const user = await userService.checkCredentials(req.body);

  if (user) {
    const token = await jwtService.createJWT(user);
    console.log(user);
    
    res.status(200).send(token);
  } else {
    res.status(404).send("NOT EXIST");
  }
});
