import { Response } from "express";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../../types";
import { UserType, DBType } from "../../db/db";
import express from "express";
import { HTTP_STATUSES } from "../../constants";
import { UserViewModel } from "./models/UserViewModel";
import { userQueryModel } from "./models/UserQueryModel";
import { URIParamsUserIdModel } from "./models/URIParamsUserIdModel";
import { UserCreateInputModel } from "./models/UserCreateModel";
import { UserUpdateInputModel } from "./models/UserUpdateModel";

export const mapEntityToViewModel = (user: UserType): UserViewModel => ({
  id: user.id,
  userName: user.userName,
});

export const usersRouter = express.Router();

export const getUsersRouter = (db: DBType) => {
  usersRouter.get("/", (req: RequestWithQuery<userQueryModel>, res: Response<UserViewModel[]>) => {
    let foundUsers = db.users;
    if (req.query.userName) {
      foundUsers = foundUsers.filter((el) => el.userName.indexOf(req.query.userName as string) > -1);
    }

    res.json(foundUsers.map((user) => ({ id: user.id, userName: user.userName })));
  });

  usersRouter.get("/:id", (req: RequestWithParams<URIParamsUserIdModel>, res: Response<UserViewModel>) => {
    const foundUser = db.users.find((el) => el.id === +req.params.id);

    if (!foundUser) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.json(mapEntityToViewModel(foundUser));
  });

  usersRouter.post("/", (req: RequestWithBody<UserCreateInputModel>, res: Response<UserViewModel>) => {
    if (!req.body.userName) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const newItem: UserType = {
      id: +new Date(),
      userName: req.body.userName,
    };
    db.users.push(newItem);

    res.status(201).json(mapEntityToViewModel(newItem));
  });

  usersRouter.put("/:id", (req: RequestWithParamsAndBody<URIParamsUserIdModel, UserUpdateInputModel>, res: Response<UserViewModel>) => {
    if (!req.params.id || !req.body.userName) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const foundUser = db.users.find((el) => el.id === +req.params.id);

    if (!foundUser) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    foundUser.userName = req.body.userName;

    res.json(mapEntityToViewModel(foundUser));
  });

  usersRouter.delete("/:id", (req: RequestWithParams<URIParamsUserIdModel>, res: Response) => {
    db.users = db.users.filter((el) => el.id !== +req.params.id);

    if (!req.params.id) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return usersRouter;
};
