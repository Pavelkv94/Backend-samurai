import { Response } from "express";
import { CoursesQueryModel } from "./models/CoursesQueryModel";
import { CourseViewModel } from "./models/CourseViewModel";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../../types";
import { URIParamsCourseIdModel } from "./models/URIParamsCourseIdModel";
import { CourseCreateInputModel } from "./models/CourseCreateModel";
import { CourseUpdateInputModel } from "./models/CourseUpdateModel";
import { CourseType, DBType } from "../../db/db";
import express from "express";
import { HTTP_STATUSES } from "../../constants";

export const getCourseViewDto = (course: CourseType): CourseViewModel => ({
  id: course.id,
  title: course.title,
});

export const coursesRouter = express.Router();

export const getCoursesRouter = (db: DBType) => {
  coursesRouter.get("/", (req: RequestWithQuery<CoursesQueryModel>, res: Response<CourseViewModel[]>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}
    let foundCourses = db.courses;
    if (req.query.title) {
      foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1);
    }

    res.json(foundCourses.map((dbCourse) => ({ id: dbCourse.id, title: dbCourse.title })));
  });

  coursesRouter.get("/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    const foundCourse = db.courses.find((el) => el.id === +req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.json(getCourseViewDto(foundCourse));
  });

  coursesRouter.post("/", (req: RequestWithBody<CourseCreateInputModel>, res: Response<CourseViewModel>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

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

  coursesRouter.put("/:id", (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateInputModel>, res: Response<CourseViewModel>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

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

  coursesRouter.delete("/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    db.courses = db.courses.filter((el) => el.id !== +req.params.id);

    if (!req.params.id) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return coursesRouter;
};
