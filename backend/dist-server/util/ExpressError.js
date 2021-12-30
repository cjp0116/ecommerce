"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnauthorizedError = exports.NotFoundError = exports.ForbiddenError = exports.BadRequestError = void 0;

class ExpressError extends Error {
  constructor(message, status) {
    super(status);
    this.message = message;
  }

}

class NotFoundError extends ExpressError {
  constructor(message = 'Not found') {
    super(message, 404);
  }

}

exports.NotFoundError = NotFoundError;
;

class UnauthorizedError extends ExpressError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }

}

exports.UnauthorizedError = UnauthorizedError;

class BadRequestError extends ExpressError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }

}

exports.BadRequestError = BadRequestError;

class ForbiddenError extends ExpressError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }

}

exports.ForbiddenError = ForbiddenError;