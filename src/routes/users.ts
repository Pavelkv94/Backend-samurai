import { Request, Response, Router } from "express";
import { usersRepository } from "../db/usersRepository";
import { HTTP_STATUSES } from "../constants";
import { userService } from "../services/users-service";

export const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await usersRepository.findUsers();

  res.status(HTTP_STATUSES.OK_200).json(users);
});

userRouter.post("/", async (req, res) => {
    const payload = req.body;
    const newUser = await userService.createUser(payload.login, payload.password)

    res.json(newUser)
});

userRouter.post("/login", async (req: Request, res: Response) => {
    const checkResult = await userService.checkCredentials(req.body)

    if(checkResult) {
        res.status(200).send("User logged")
    } else {
        res.status(404).send("NOT EXIST")
    }
});
