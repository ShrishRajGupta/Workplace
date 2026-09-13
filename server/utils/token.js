import jsonwebtoken from "jsonwebtoken";

export const TOKEN_TTL = "24h"; // keep in sync with utils/cookieOptions.js maxAge

// Signs the minimal identity payload that validateJWT puts back on req.user.
export const signToken = (user) =>
  jsonwebtoken.sign(
    { user: { username: user.username, email: user.email, id: user._id } },
    process.env.ACCESS_TOKEN,
    { expiresIn: TOKEN_TTL }
  );
