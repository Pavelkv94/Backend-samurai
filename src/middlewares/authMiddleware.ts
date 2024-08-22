import { NextFunction, Request, Response } from "express";
import { jwtService } from "../app/jwt-service";
import { userService } from "../domain/users-service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    res.sendStatus(401);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];

  console.log("TOKEN: ", token);

  const userId = await jwtService.getAuthorizedUser(token);
  if (userId) {
    next();
  } else {
    res.sendStatus(401);
  }
};
