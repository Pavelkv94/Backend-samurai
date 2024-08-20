import { Response } from "express";
import { CoursesQueryModel } from "../models/CoursesQueryModel";
import { CourseViewModel } from "../models/CourseViewModel";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "../types";
import { URIParamsCourseIdModel } from "../models/URIParamsCourseIdModel";
import { CourseCreateInputModel } from "../models/CourseCreateModel";
import { CourseUpdateInputModel } from "../models/CourseUpdateModel";
import { CourseType } from "../db/db";
import express from "express";
import { HTTP_STATUSES } from "../constants";
import { body } from "express-validator";
import { validationInputMiddleware } from "../middlewares/validationMiddleware";
import { coursesService } from "../domain/courses-service";

type CourseViewModelWithErrors = {
  errors: any[];
};

export const getCourseViewDto = (course: CourseType): CourseViewModel => ({
  id: course.id,
  title: course.title,
});

export const coursesRouter = express.Router();

export const getCoursesRouter = () => {
  coursesRouter.get("/", async (req: RequestWithQuery<CoursesQueryModel>, res: Response<CourseViewModel[]>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    // let start = +new Date();
    // while(+new Date - start < 3000) {
    //   console.log(+new Date - start)
    // } //todo пока работает цикл сервер занят и не доступен для других запросов

    
    const courses: CourseType[] = await coursesService.findCourses(req.query.title);

    res.json(courses.map(getCourseViewDto));
  });

  coursesRouter.get("/:id", async (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    const foundCourse: CourseType | null = await coursesService.findCourseById(req.params.id);

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
    async (req: RequestWithBody<CourseCreateInputModel>, res: Response<CourseViewModel | CourseViewModelWithErrors>) => {
      //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      const newItem: CourseType = await coursesService.createCourse(req.body.title);

      res.status(201).json(getCourseViewDto(newItem));
    }
  );

  coursesRouter.put("/:id", async (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateInputModel>, res: Response<CourseViewModel>) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    if (!req.params.id || !req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }

    const isUpdated: boolean = await coursesService.updateCourse(req.body.title, req.params.id);

    if (isUpdated) {
      const updatedCourse = await coursesService.findCourseById(req.params.id);
      updatedCourse && res.json(getCourseViewDto(updatedCourse));
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
  });

  coursesRouter.delete("/:id", async (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) => {
    //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

    if (!req.params.id) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      return;
    }
    const isDeleted: boolean = await coursesService.deleteCourse(req.params.id);

    if (isDeleted) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    }
  });

  return coursesRouter;
};
