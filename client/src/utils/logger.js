// Console output that is silent in production builds.
const enabled = process.env.NODE_ENV !== "production";

const logger = {
  warn: (...args) => enabled && console.warn(...args),
  error: (...args) => enabled && console.error(...args),
};

export default logger;
