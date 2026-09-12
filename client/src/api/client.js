import axios from "axios";

// Single axios instance for the whole app.
// - baseURL is empty in development so calls go through the CRA proxy (client/package.json);
//   set REACT_APP_API_URL when the API is served from another origin.
// - withCredentials sends the httpOnly auth cookie on cross-origin calls.
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
  withCredentials: true,
});

let onUnauthorized = null;

// AuthContext registers a callback so an expired/invalid session logs the user out everywhere.
export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorized) onUnauthorized();
    return Promise.reject(error);
  }
);

// Human-readable message from an axios error (server envelope first, then axios/network).
export const getErrorMessage = (error, fallback = "Something went wrong") =>
  error?.response?.data?.message || error?.message || fallback;

export default api;
