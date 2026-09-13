import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getErrorMessage } from "../../api/client";
import HeroLayout from "../../components/HeroLayout/HeroLayout";

const LoginPage = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { login, pending } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login({ email: email.current.value, password: password.current.value });
      const from = location.state?.from?.pathname;
      navigate(from || `/user/profile/${user._id}`, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not log in"));
    }
  };

  return (
    <HeroLayout variant="auth">
      <div className="auth-card">
        <h1>Log in</h1>
        <p className="auth-card__sub">Welcome back to Workplace.</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" type="email" required autoComplete="email" ref={email} />
          <input placeholder="Password" type="password" required minLength="6" autoComplete="current-password" ref={password} />
          <button type="submit" disabled={pending}>
            {pending ? "Logging in…" : "Log in"}
          </button>
        </form>
        <p className="auth-card__switch">
          Don't have an account? <Link to="/user/register">Sign up</Link>
        </p>
      </div>
    </HeroLayout>
  );
};

export default LoginPage;
