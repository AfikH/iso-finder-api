import AppError from "@errors/AppError";

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(404, message);
  }
}

export default NotFoundError;
