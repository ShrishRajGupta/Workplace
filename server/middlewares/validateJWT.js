import jsonwebtoken from "jsonwebtoken";

// Reads the JWT from the httpOnly `authorization` cookie (set at login) or from an
// `Authorization: Bearer <token>` header, verifies it, and exposes the payload as req.user.
const authenticateToken = (req, res, next) => {
  const bearer = req.headers.authorization;
  const token =
    req.cookies?.authorization ||
    (bearer && bearer.startsWith("Bearer ") ? bearer.slice("Bearer ".length) : undefined);

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded.user;
    return next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authenticateToken;
