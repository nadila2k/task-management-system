import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  const bodyToValidate = (req.body && typeof req.body === "object" && !Array.isArray(req.body)) 
    ? req.body 
    : {};


  const result = schema.safeParse(bodyToValidate, { abortEarly: true });

  if (!result.success) {
    const firstError = result.error.issues[0];
    const errors = [
      {
        field: firstError?.path.join(".") || "body",
        message: firstError?.message || "Invalid input",
      },
    ];

    return next(ApiError.badRequest("Validation failed", errors));
  }

  req.validatedBody = result.data;
  next();
};

export default validate;