const port = process.env.PORT || 3005;

import express from "express";
import { runDb } from "./repositories/db";
import { userRouter } from "./routes/users";

export const app = express();

app.use(express.json());

app.use("/users", userRouter);

const startApp = async () => {
  await runDb();

  app.listen(port, () => {
    console.log(`Log:  app listening on port ${port}`);
  });
};

startApp();
