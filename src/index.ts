const port = process.env.PORT || 3005;

import express from "express";
import { getCoursesRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";
import { db, runDb } from "./db/db";
import { requestMiddleware } from "./middlewares/requestCountMiddleware";
import { CYAN, GREEN, RED, RESET } from "./constants";

export const app = express();

const jsonBodyMiddleware = express.json(); //Instead of bodyparser
app.use(jsonBodyMiddleware);

app.use(requestMiddleware);

app.use("/courses", getCoursesRouter());
app.use("/__test__", getTestsRouter(db));

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(CYAN + `Log:  app listening on port ${port}` + RESET);
  });
};

startApp();
