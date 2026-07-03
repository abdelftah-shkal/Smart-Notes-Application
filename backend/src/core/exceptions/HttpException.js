/**
 * Workspace Flow — HTTP Exception
 * @author Abdelfatah
 * Custom error class with factory methods for common HTTP errors.
 */

class HttpException extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  // ─── Factory Methods ────────────────────────────────────────────────────

  static badRequest(message = 'Bad request', errors = []) {
    return new HttpException(message, 400, errors);
  }

  static unauthorized(message = 'Unauthorized') {
    return new HttpException(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new HttpException(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new HttpException(message, 404);
  }

  static conflict(message = 'Conflict') {
    return new HttpException(message, 409);
  }

  static internal(message = 'Internal server error') {
    return new HttpException(message, 500);
  }
}

module.exports = HttpException;
