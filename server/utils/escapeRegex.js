// Escapes user input before it is interpolated into a MongoDB $regex, so characters like
// `(`, `+`, `*` are matched literally instead of changing (or blowing up) the pattern.
const escapeRegex = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default escapeRegex;
