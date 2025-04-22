import AppError from "@errors/AppError";

class ValidationError extends AppError {
  constructor(statusCode: number = 400, message = "Invalid request data") {
    super(statusCode, message);
  }
}

export default ValidationError;
