class ExpressError extends Error {
  constructor(message, status) {
    super(status);
    this.message = message
  }
}

class NotFoundError extends ExpressError {
  constructor(message = 'Not found', status) {

  }
}