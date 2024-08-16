import express from "express";
import { getCoursesRouter } from "./routes/courses";
import { getTestsRouter } from "./routes/tests";
import { db } from "./db/db";
import { requestMiddleware } from "./middlewares/requestCountMiddleware";

export const app = express();

const jsonBodyMiddleware = express.json(); //Instead of bodyparser
app.use(jsonBodyMiddleware);

app.use(requestMiddleware);

app.use("/courses", getCoursesRouter(db));
app.use("/__test__", getTestsRouter(db));
