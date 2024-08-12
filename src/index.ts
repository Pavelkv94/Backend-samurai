import express from "express";

const app = express();
const port = 3005;

app.get("/", (req: any, res:any) => {
  res.send("Hello World! aasdsssss 123123123");
});
app.get("/123", (req: any, res:any) => {
  res.send("Hello World! aasdsssss 123123123");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
