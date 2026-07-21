export class ApiResponse {
 
  static success(res, message = "Operation successful", data = null, statusCode = 200, meta = null) {
    const response = {
      status: "success",
      message,
      data,
    };

    if (meta) response.meta = meta;

    return res.status(statusCode).json(response);
  }


  static fail(res, message = "Validation failed or resource not found", errors = null, statusCode = 400) {
    return res.status(statusCode).json({
      status: "fail",
      message,
      data: errors,
    });
  }

  static error(res, message = "Internal server error", error = null, statusCode = 500) {
    return res.status(statusCode).json({
      status: "error",
      message,
      data: process.env.NODE_ENV === "development" ? error : null,
    });
  }
}