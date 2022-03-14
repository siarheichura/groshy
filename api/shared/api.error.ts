import { ValidationError } from 'express-validator';

export class ApiError extends Error {
  status: number;
  errors: Error[] | ValidationError[];

  constructor(
    status: number,
    message: any,
    errors: Error[] | ValidationError[] = []
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'User is not authorized');
  }

  static BadRequest(message: string, errors: ValidationError[] = []) {
    return new ApiError(400, message, errors);
  }
}
