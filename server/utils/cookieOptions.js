const ONE_DAY_MS = 24 * 60 * 60 * 1000; // matches the JWT expiresIn of 24h

// Options for the httpOnly auth cookie. `secure` is only enforced in production so the
// app still works over plain http in local development.
export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: ONE_DAY_MS,
};

// clearCookie must be given the same attributes (minus maxAge) to match the cookie.
export const clearAuthCookieOptions = {
  httpOnly: authCookieOptions.httpOnly,
  secure: authCookieOptions.secure,
  sameSite: authCookieOptions.sameSite,
};
