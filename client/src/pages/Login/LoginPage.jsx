import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
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
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
        <input placeholder="Password" type="password" required minLength="6" className="loginInput" ref={password} />
        <button type="submit" style={{ width: "35%" }} disabled={pending}>
          {pending ? "Logging in…" : "Login"}
        </button>
      </form>
      <h4>Don't have an Account ?</h4>
      <span onClick={() => navigate("/user/register")} style={{ cursor: "pointer", color: "purple", fontWeight: "bold" }}>
        SignUp
      </span>
    </HeroLayout>
  );
};

export default LoginPage;
