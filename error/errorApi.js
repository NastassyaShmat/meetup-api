class ErrorApi extends Error {
  status;
  errors;
  message;

  constructor(status, message, errors) {
    super();
    this.status = status;
    this.errors = errors;
    this.message = message;
  }

  static badRequest(message, errors) {
    return new ErrorApi(400, message, errors);
  }
  static notFound(message) {
    return new ErrorApi(404, message);
  }
  static forbidden(message) {
    return new ErrorApi(403, message);
  }
  static unauthorized(message) {
    return new ErrorApi(401, message);
  }
}

module.exports = ErrorApi;
