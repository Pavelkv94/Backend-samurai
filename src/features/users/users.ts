import { Response } from "express";
import { CoursesQueryModel } from "../courses/models/CoursesQueryModel";
import { CourseViewModel } from "../courses/models/CourseViewModel";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../../types";
import { URIParamsCourseIdModel } from "../courses/models/URIParamsCourseIdModel";
import { CourseCreateInputModel } from "../courses/models/CourseCreateModel";
import { CourseUpdateInputModel } from "../courses/models/CourseUpdateModel";
import { CourseType, DBType } from "../../db/db";
import express from "express";
import { HTTP_STATUSES } from "../../constants";

export const getCourseViewDto = (course: CourseType): CourseViewModel => ({
  id: course.id,
  title: course.title,
});

export const usersRouter = express.Router();

export const getUsersRouter = (db: DBType) => {
  usersRouter.get("/", (req: RequestWithQuery<CoursesQueryModel>, res: Response<CourseViewModel[]>) => {
    let foundCourses = db.courses;
    if (req.query.title) {
      foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1);
    }

    res.json(foundCourses.map((dbCourse) => ({ id: dbCourse.id, title: dbCourse.title })));
  });

  usersRouter.get("/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {

    const foundCourse = db.courses.find((el) => el.id === +req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.json(getCourseViewDto(foundCourse));
  });

  usersRouter.post("/", (req: RequestWithBody<CourseCreateInputModel>, res: Response<CourseViewModel>) => {

    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const newItem: CourseType = {
      id: +new Date(),
      title: req.body.title,
      studentsCount: 0,
    };
    db.courses.push(newItem);

    res.status(201).json(getCourseViewDto(newItem));
  });

  usersRouter.put("/:id", (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateInputModel>, res: Response<CourseViewModel>) => {

    // db.courses = db.courses.map(el => el.id === +req.params.id ? {...el, title: req.body.title} : el)

    if (!req.params.id || !req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const foundCourse = db.courses.find((el) => el.id === +req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }

    foundCourse.title = req.body.title;

    res.json(getCourseViewDto(foundCourse));
  });

  usersRouter.delete("/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) => {

    db.courses = db.courses.filter((el) => el.id !== +req.params.id);

    if (!req.params.id) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return usersRouter;
};
