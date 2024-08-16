import { DBType } from "../db/db";
import express from "express";
import { HTTP_STATUSES } from "../constants";

export const testsRouter = express.Router();

export const getTestsRouter = (db: DBType) => {
  testsRouter.delete("/data", (req: any, res: any) => {
    db.courses = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return testsRouter;
};
