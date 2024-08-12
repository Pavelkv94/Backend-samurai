import express from "express";

const app = express();
const port = 3005;

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  NOT_FOUND_404: 404,
  BAD_REQUEST_400: 400,
};
const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const db = {
  courses: [
    { id: 1, title: "js" },
    { id: 2, title: "html" },
    { id: 3, title: "css" },
  ],
};

app.get("/", (req: any, res: any) => {
  res.json(1000);
});

app.get("/courses", (req: any, res: any) => {
  let foundCourses = db.courses;
  if (req.query.title) {
    foundCourses = foundCourses.filter((el) => el.title.indexOf(req.query.title as string) > -1);
  }

  res.json(foundCourses);
});

app.get("/courses/:id", (req: any, res: any) => {
  const foundCourse = db.courses.find((el) => el.id === +req.params.id);

  if (!foundCourse) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundCourse);
});

app.post("/courses", (req: any, res: any) => {
  console.log(req.body);

  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }
  const newItem = {
    id: +new Date(),
    title: req.body.title,
  };
  db.courses.push(newItem);

  res.status(201).json(newItem);
});

app.put("/courses/:id", (req: any, res: any) => {
  const foundCourse = db.courses.find((el) => el.id === +req.params.id);

  // db.courses = db.courses.map(el => el.id === +req.params.id ? {...el, title: req.body.title} : el)

  if (!req.params.id || !req.body.title) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  //@ts-ignore
  foundCourse.title = req.body.title;

  res.json(foundCourse);
});

app.delete("/courses/:id", (req: any, res: any) => {
  db.courses = db.courses.filter((el) => el.id !== +req.params.id);

  if (!req.params.id) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
