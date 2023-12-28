import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../index";
import "../css/home.css";
const Login = () => {
  const { isAuthenticated, setisAuthenticated} =
    useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId,setuserId] = useState();
  const navigate = useNavigate();
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
    <div className="reg" style={{fontFamily: "sans-serif", fontSize: "20px", display:"flex", justifyContent:"center"}}>
        <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
      
      <div className="innerdiv">
      <h1>Login</h1>
      
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
          <button type="submit" style={{width:"35%"}}>
            Login
          </button>
          
        </form>
        <h4>Don't have an Account ?</h4>
          <span onClick={()=>{
            navigate("/user/register");
          }} style={{cursor:"pointer" , color:"purple", fontWeight:"bold"}}>SignUp</span>
      </div>
    </div>
  );
};

export default Login;