// Wraps an async route handler so a rejected promise reaches the global error handler
// instead of leaving the request hanging.
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;
