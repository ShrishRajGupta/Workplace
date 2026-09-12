import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Renders child routes only for a logged-in user; otherwise redirects to login and remembers
// where the user was going so login can send them back.
export const ProtectedRoute = () => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <p className="route-loading">Loading…</p>;
  if (status !== "authenticated") return <Navigate to="/user/login" replace state={{ from: location }} />;
  return <Outlet />;
};

// Login/register are pointless for a logged-in user: send them to their profile instead.
export const AnonymousRoute = () => {
  const { status, user } = useAuth();

  if (status === "loading") return null;
  if (status === "authenticated") return <Navigate to={`/user/profile/${user._id}`} replace />;
  return <Outlet />;
};
