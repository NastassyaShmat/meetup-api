class ErrorApi extends Error {
  status;
  errors;

  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message, errors) {
    return new ErrorApi(404, message, errors);
  }
  static internal(message) {
    return new ErrorApi(500, message);
  }
  static forbidden(message) {
    return new ErrorApi(403, message);
  }
  static unauthorized() {
    return new ErrorApi(401, "User is not authorized");
  }
}

module.exports = ErrorApi;
