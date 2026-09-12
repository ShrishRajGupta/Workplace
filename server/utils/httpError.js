// An Error carrying an HTTP status, understood by middlewares/errorHandler.js.
export default class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
