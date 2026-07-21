import { ApiResponse } from "../utils/apiResponse.js";

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message || "Something went wrong on the server";

 
  if (status === "fail") {
    return ApiResponse.fail(res, message, err.data || null, statusCode);
  }


  console.error("Global Error Handler Caught:", err);

  return ApiResponse.error(
    res,
    message,
    process.env.NODE_ENV === "development" ? err.stack : null,
    statusCode
  );
};