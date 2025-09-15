import { validationResult } from "express-validator";

export default function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extractedErrors = errors.array().map(err => ({ [err.param]: err.msg }));
    return res.status(400).json({
      success: false,
      errors: extractedErrors,
    });
  }
  next();
}
