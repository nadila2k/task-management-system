export class ApiError extends Error {
  constructor(statusCode, message, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 500 ? "error" : "fail";
    this.data = data;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request", errors = null) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static internal(message = "Internal Server Error", data = null) {
    return new ApiError(500, message, data);
  }
}

export default ApiError;