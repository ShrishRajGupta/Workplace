import api from "./client";

// All auth calls return the user object from the server envelope { success, message, user }.
export const login = (credentials) => api.post("/user/login", credentials).then((r) => r.data.user);
export const register = (details) => api.post("/user/register", details).then((r) => r.data.user);
export const logout = () => api.get("/user/logout");
export const fetchMe = () => api.get("/user/profile").then((r) => r.data.user);
export const sendWelcomeEmail = () => api.post("/email/intro");
