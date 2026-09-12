// JSON 404 for unknown routes.
export const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// Single place that turns thrown errors into JSON responses. Mongoose and multer errors are
// mapped to 4xx; anything else is a 500 with the details kept server-side.
// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  let status = err.status || err.statusCode || 500;
  let message = err.message || "Internal server error";

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  } else if (err.name === "CastError") {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err.code === 11000) {
    status = 409;
    message = `${Object.keys(err.keyValue || {}).join(", ") || "value"} already in use`;
  } else if (err.name === "MulterError") {
    status = 400;
  }

  // Only unexpected errors (no explicit status) are masked and logged with their stack;
  // deliberate 5xx such as "email not configured" keep their message.
  const unexpected = !err.status && !err.statusCode && status >= 500;
  if (unexpected) {
    console.error(err);
    message = "Internal server error";
  }
  res.status(status).json({ success: false, message });
};
