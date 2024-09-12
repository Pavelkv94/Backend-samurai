import { Response } from "express";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../../types";
import { UserType, DBType } from "../../db/db";
import express from "express";
import { HTTP_STATUSES } from "../../constants";

import { CreateCourseUserBindingModel } from "./model/CreateCourseUserBindingModel";
import { CourseUserBindingViewModel } from "./model/CourseUserBindingViewModel";

export const usersCoursesBindRouter = express.Router();

export const getUsersCoursesBindRouterRouter = (db: DBType) => {
  // usersCoursesBindRouter.get("/", (req: RequestWithQuery<userQueryModel>, res: Response<UserViewModel[]>) => {
  //   let foundUsers = db.users;
  //   if (req.query.userName) {
  //     foundUsers = foundUsers.filter((el) => el.userName.indexOf(req.query.userName as string) > -1);
  //   }

  //   res.json(foundUsers.map((user) => ({ id: user.id, userName: user.userName })));
  // });

  // usersCoursesBindRouter.get("/:id", (req: RequestWithParams<URIParamsUserIdModel>, res: Response<UserViewModel>) => {
  //   const foundUser = db.users.find((el) => el.id === +req.params.id);

  //   if (!foundUser) {
  //     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  //     return;
  //   }
  //   res.json(mapEntityToViewModel(foundUser));
  // });

  usersCoursesBindRouter.post("/", (req: RequestWithBody<CreateCourseUserBindingModel>, res: Response<CourseUserBindingViewModel>) => {
    if (!req.body.studentId) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const newItem: CourseUserBindingViewModel = {
      date: new Date(),
      studentId: req.body.studentId,
      courseId: req.body.courseId,
    };
    db.studentCourseBindings.push(newItem);

    res.status(201).json(newItem);
  });

  // usersCoursesBindRouter.put("/:id", (req: RequestWithParamsAndBody<URIParamsUserIdModel, UserUpdateInputModel>, res: Response<UserViewModel>) => {
  //   if (!req.params.id || !req.body.userName) {
  //     res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
  //     return;
  //   }
  //   const foundUser = db.users.find((el) => el.id === +req.params.id);

  //   if (!foundUser) {
  //     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  //     return;
  //   }

  //   foundUser.userName = req.body.userName;

  //   res.json(mapEntityToViewModel(foundUser));
  // });

  // usersCoursesBindRouter.delete("/:id", (req: RequestWithParams<URIParamsUserIdModel>, res: Response) => {
  //   db.users = db.users.filter((el) => el.id !== +req.params.id);

  //   if (!req.params.id) {
  //     res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  //     return;
  //   }
  //   res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  // });

  return usersCoursesBindRouter;
};
