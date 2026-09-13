import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { sendWelcomeEmail } from "../../api/auth";
import { getErrorMessage } from "../../api/client";
import HeroLayout from "../../components/HeroLayout/HeroLayout";

const RegisterPage = () => {
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const { register, pending } = useAuth();

  const clearMismatch = () => passwordAgain.current.setCustomValidity("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
      passwordAgain.current.reportValidity();
      return;
    }
    try {
      // Registering also logs the user in (the server sets the auth cookie).
      const user = await register({
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      });
      sendWelcomeEmail().catch(() => {}); // best effort; email may be unconfigured
      toast.success(`Welcome, ${user.username}!`);
      navigate(`/user/profile/${user._id}`, { replace: true });
    } catch (error) {
      toast.error(getErrorMessage(error, "Could not register"));
    }
  };

  return (
    <HeroLayout variant="auth">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input placeholder="Username" required ref={username} className="loginInput" />
        </label>
        <label>
          Email:
          <input placeholder="Email" required ref={email} className="loginInput" type="email" />
        </label>
        <label>
          Password:
          <input placeholder="Password" required ref={password} className="loginInput" type="password" minLength="6" onChange={clearMismatch} />
        </label>
        <label>
          Password Again:
          <input placeholder="Password Again" required ref={passwordAgain} className="loginInput" type="password" onChange={clearMismatch} />
        </label>
        <button type="submit" style={{ width: "35%" }} disabled={pending}>
          {pending ? "Signing up…" : "Sign Up"}
        </button>
      </form>
      <h4>Already have an account ?</h4>
      <span onClick={() => navigate("/user/login")} style={{ cursor: "pointer", color: "purple", fontWeight: "bold" }}>
        Login
      </span>
    </HeroLayout>
  );
};

export default RegisterPage;
