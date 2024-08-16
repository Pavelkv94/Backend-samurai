let requestCounter = 0;
//@ts-ignore
export const requestMiddleware = (req, res, next) => {
  requestCounter++;
  console.log(requestCounter);
  next();
};
