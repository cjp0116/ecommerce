class ExpressError extends Error {
  constructor(message, status) {
    super(status);
    this.message = message
  }
}

class NotFoundError extends ExpressError {
  constructor(message = 'Not found') {
    super(message, 404)
  }
};

class UnauthorizedError extends ExpressError {
  constructor(message = 'Unauthorized') {
    super(message, 401)
  }
}

class BadRequestError extends ExpressError {
  constructor(message = 'Bad Request') {
    super(message, 400)
  }
}

class ForbiddenError extends ExpressError {
  constructor(message = 'Forbidden') {
    super(message, 403)
  }
}

export { NotFoundError, ForbiddenError, UnauthorizedError , BadRequestError };
