import ApiError from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;


  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    error = ApiError.badRequest("Invalid JSON payload in request body");
  } else if (err.name === "JsonWebTokenError") {
    error = ApiError.unauthorized("Invalid token signature");
  } else if (err.name === "TokenExpiredError") {
    error = ApiError.unauthorized("Token has expired");
  } else if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    const errors = err.errors?.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = ApiError.badRequest("Database validation error", errors);
  } else if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || error.status || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message);
  }

  const statusCode = error.statusCode || 500;
  const status = error.status || (statusCode >= 500 ? "error" : "fail");
  const message = error.message || "Internal Server Error";
  const data = error.data || null;

  if (statusCode === 500) {
    console.error("CRITICAL UNHANDLED ERROR:", err);
  }

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};