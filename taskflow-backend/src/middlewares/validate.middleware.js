import ApiError from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  const bodyToValidate =
    req.body && typeof req.body === "object" && !Array.isArray(req.body)
      ? req.body
      : {};

  // Handle empty request body on PUT / PATCH update requests
  if (!req.body || Object.keys(bodyToValidate).length === 0) {
    if (req.method === "PUT" || req.method === "PATCH") {
      return next(
        ApiError.badRequest("Request body cannot be empty", [
          {
            field: "body",
            message: "At least one field must be provided for update",
          },
        ])
      );
    }
  }

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