import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../index";

const Login = () => {
  const { isAuthenticated, setisAuthenticated, loading, setLoading } =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId,setuserId] = useState();
  const submitHandler = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post("/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(response.message);
      setisAuthenticated(true);
      setuserId(response.data.user._id);
    } catch (error) {
      
      setisAuthenticated(false);
    }
  };

  if (isAuthenticated) return <Navigate to={`/user/profile/${userId}`} />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            Login
          </button>
          <h4>Or</h4>
          <Link to="/user/register">Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;