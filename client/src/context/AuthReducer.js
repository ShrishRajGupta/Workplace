// status: "loading" (cached session being re-validated) | "authenticated" | "anonymous"
export const initialAuthState = { user: null, status: "anonymous", pending: false, error: null };

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, pending: true, error: null };
    case "LOGIN_SUCCESS":
      return { user: action.payload, status: "authenticated", pending: false, error: null };
    case "LOGIN_FAILURE":
      return { user: null, status: "anonymous", pending: false, error: action.payload };
    case "LOGOUT":
      return { ...initialAuthState };
    case "UPDATE_USER":
      return { ...state, user: { ...state.user, ...action.payload } };
    default:
      return state;
  }
};

export default AuthReducer;
