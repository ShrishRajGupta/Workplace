import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import AuthReducer, { initialAuthState } from "./AuthReducer";
import { getErrorMessage, setUnauthorizedHandler } from "../api/client";
import * as authApi from "../api/auth";

const STORAGE_KEY = "user";

// Reads the cached user. Older builds stored the whole { success, message, user } envelope.
const readStoredUser = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed) return null;
    return parsed.user && parsed.success !== undefined ? parsed.user : parsed;
  } catch {
    return null;
  }
};

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState, (initial) => {
    const user = readStoredUser();
    return user ? { ...initial, user, status: "loading" } : initial;
  });

  // Keep the cache in sync so a reload does not flash the login page.
  useEffect(() => {
    if (state.user) localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [state.user]);

  // Any 401 from the API means the cookie is gone or expired: drop the session.
  useEffect(() => {
    setUnauthorizedHandler(() => dispatch({ type: "LOGOUT" }));
    return () => setUnauthorizedHandler(null);
  }, []);

  // Re-validate a cached session against the server on first load.
  useEffect(() => {
    if (!readStoredUser()) return undefined;
    let cancelled = false;
    authApi
      .fetchMe()
      .then((user) => !cancelled && dispatch({ type: "LOGIN_SUCCESS", payload: user }))
      .catch(() => !cancelled && dispatch({ type: "LOGOUT" }));
    return () => {
      cancelled = true;
    };
  }, []);

  const runAuth = useCallback(async (request) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const user = await request();
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
      return user;
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: getErrorMessage(error, "Could not sign in") });
      throw error;
    }
  }, []);

  const login = useCallback((credentials) => runAuth(() => authApi.login(credentials)), [runAuth]);
  const register = useCallback((details) => runAuth(() => authApi.register(details)), [runAuth]);
  const logout = useCallback(async () => {
    await authApi.logout().catch(() => {}); // local state is cleared even if the server is down
    dispatch({ type: "LOGOUT" });
  }, []);
  const updateUser = useCallback((patch) => dispatch({ type: "UPDATE_USER", payload: patch }), []);
  // Pull the latest user from the server (new connection requests, friends, posts).
  const refreshUser = useCallback(async () => {
    const user = await authApi.fetchMe();
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
    return user;
  }, []);

  const value = useMemo(
    () => ({ ...state, login, register, logout, updateUser, refreshUser, dispatch }),
    [state, login, register, logout, updateUser, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
