import { Request, Response, Router } from "express";
import { usersRepository } from "../repositories/usersRepository";
import { userService } from "../domain/users-service";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await usersRepository.getUsers();

  res.status(200).json(users);
});

userRouter.get("/:id", async (req, res) => {
  //@ts-ignore
  const user = await usersRepository.getUser(req.params.id);

  res.status(200).json(user);
});

userRouter.post("/", async (req, res) => {
  const newUser = await userService.createUser(req.body);
  if (newUser) {
    res.json(newUser);
  } else res.sendStatus(404);
});
