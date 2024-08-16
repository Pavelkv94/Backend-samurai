import { validationResult } from "express-validator";
import { HTTP_STATUSES } from "../constants";

//@ts-ignore
export const validationInputMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HTTP_STATUSES.BAD_REQUEST_400).json({ errors: errors.array() });
  } else {
    next();
  }
};
