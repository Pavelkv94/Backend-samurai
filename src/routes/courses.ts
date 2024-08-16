import { Response } from "express";
import { CoursesQueryModel } from "../models/CoursesQueryModel";
import { CourseViewModel } from "../models/CourseViewModel";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../types";
import { URIParamsCourseIdModel } from "../models/URIParamsCourseIdModel";
import { CourseCreateInputModel } from "../models/CourseCreateModel";
import { CourseUpdateInputModel } from "../models/CourseUpdateModel";
import { CourseType, DBType } from "../db/db";
import express from "express";
import { HTTP_STATUSES } from "../constants";
import { coursesRepository } from "../db/courseRepository";
import { body, validationResult } from "express-validator";
import { validationInputMiddleware } from "../middlewares/validationMiddleware";

type CourseViewModelWithErrors = {
  errors: any[];
};

export const getCourseViewDto = (course: CourseType): CourseViewModel => ({
  id: course.id,
  title: course.title,
});

export const coursesRouter = express.Router();

export const getCoursesRouter = () => {
  coursesRouter.get("/", (req: RequestWithQuery<CoursesQueryModel>, res: Response<CourseViewModel[]>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    const courses = coursesRepository.findCourses(req.query.title);

    res.json(courses.map((dbCourse) => ({ id: dbCourse.id, title: dbCourse.title })));
  });

  coursesRouter.get("/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    const foundCourse = coursesRepository.findCourseById(req.params.id);

    if (!foundCourse) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    res.json(getCourseViewDto(foundCourse));
  });

  coursesRouter.post(
    "/",
    body("title").isString(),
    body("title").isLength({ min: 1, max: 20 }).withMessage("TITLE SHOULD BE FROM 1 TO 20"),
    validationInputMiddleware, 
    (req: RequestWithBody<CourseCreateInputModel>, res: Response<CourseViewModel | CourseViewModelWithErrors>) => {
      //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const newItem = coursesRepository.createCourse(req.body.title);

      res.status(201).json(getCourseViewDto(newItem));
    }
  );

  coursesRouter.put("/:id", (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateInputModel>, res: Response<CourseViewModel>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    if (!req.params.id || !req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }

    const isUpdated = coursesRepository.updateCourse(req.body.title, req.params.id);

    if (isUpdated) {
      const updatedCourse = coursesRepository.findCourseById(req.params.id);
      updatedCourse && res.json(getCourseViewDto(updatedCourse));
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
  });

  coursesRouter.delete("/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    if (!req.params.id) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    const isDeleted = coursesRepository.deleteCourse(req.params.id);

    if (isDeleted) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  });

  return coursesRouter;
};
