import ApiError from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
  let error = err;


  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    error = ApiError.badRequest("Invalid JSON payload");
  }


  if (err.name === "JsonWebTokenError") {
    error = ApiError.unauthorized("Invalid token signature");
  }
  if (err.name === "TokenExpiredError") {
    error = ApiError.unauthorized("Token has expired");
  }


  const statusCode = error.statusCode || 500;
  const status = error.status || (statusCode >= 500 ? "error" : "fail");
  const message = error.message || "Internal Server Error";
  const data = error.data || null;


  if (statusCode === 500) {
    console.error("🔥 CRITICAL SERVER ERROR:", err);
  }

  res.status(statusCode).json({
    status,
    message,
    data,
  });
};