import { app } from "./app";

const port = process.env.PORT || 3005;

app.listen(port, () => {
  console.log(`Log:  app listening on port ${port}`);
});
