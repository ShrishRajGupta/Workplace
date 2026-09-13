import React, { useRef } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="auth-card">
        <h2>Create your account</h2>
        <p className="auth-card__sub">Free for job seekers and employers.</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Username" required autoComplete="username" ref={username} />
          <input placeholder="Email" type="email" required autoComplete="email" ref={email} />
          <input placeholder="Password (min. 6 characters)" type="password" required minLength="6" autoComplete="new-password" ref={password} onChange={clearMismatch} />
          <input placeholder="Repeat password" type="password" required autoComplete="new-password" ref={passwordAgain} onChange={clearMismatch} />
          <button type="submit" disabled={pending}>
            {pending ? "Signing up…" : "Sign up"}
          </button>
        </form>
        <p className="auth-card__switch">
          Already have an account? <Link to="/user/login">Log in</Link>
        </p>
      </div>
    </HeroLayout>
  );
};

export default RegisterPage;
