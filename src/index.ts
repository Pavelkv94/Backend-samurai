import express, { Request, Response } from "express";
import { RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery } from "./types";
import { CourseCreateInputModel } from "./models/CourseCreateModel";
import { CourseUpdateInputModel } from "./models/CourseUpdateModel";
import { CoursesQueryModel } from "./models/CoursesQueryModel";
import { CourseViewModel } from "./models/CourseViewModel";
import { URIParamsCourseIdModel } from "./models/URIParamsCourseIdModel";

export const app = express();
const port = 3005;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  NOT_FOUND_404: 404,
  BAD_REQUEST_400: 400,
};
const jsonBodyMiddleware = express.json(); //Instead of bodyparser
app.use(jsonBodyMiddleware);

type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
};

const db: { courses: CourseType[] } = {
  courses: [
    { id: 1, title: "js", studentsCount: 10 },
    { id: 2, title: "html", studentsCount: 10 },
    { id: 3, title: "css", studentsCount: 10 },
  ],
};

const getCourseViewDto = (course: CourseType): CourseViewModel => ({
  id: course.id,
  title: course.title
});

app.get("/", (req: Request, res: Response) => {
  res.json(1000);
});

app.get("/courses", (req: RequestWithQuery<CoursesQueryModel>, res: Response<CourseViewModel[]>) => {
  //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1);
  }

  res.json(foundCourses.map((dbCourse) => ({ id: dbCourse.id, title: dbCourse.title })));
});

app.get("/courses/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response<CourseViewModel>) => {
  //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

  const foundCourse = db.courses.find((el) => el.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(getCourseViewDto(foundCourse));
});

app.post("/courses", (req: RequestWithBody<CourseCreateInputModel>, res: Response<CourseViewModel>) => {
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

app.put("/courses/:id", (req: RequestWithParamsAndBody<URIParamsCourseIdModel, CourseUpdateInputModel>, res: Response<CourseViewModel>) => {
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

app.delete("/courses/:id", (req: RequestWithParams<URIParamsCourseIdModel>, res: Response) => {
  //todo types - {params Types}, {resBody types}, {reqBody types}, {query types}

  db.courses = db.courses.filter((el) => el.id !== +req.params.id);

  if (!req.params.id) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.delete("/__test__/data", (req: any, res: any) => {
  db.courses = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Log:  app listening on port ${port}`);
});
