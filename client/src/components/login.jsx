
import React, { useContext, useState,useRef,useEffect } from "react";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import {AuthContext} from "../context/AuthContext";
import {loginCall} from "../apiCalls";
import "../css/home.css";
import { removeCookie,setCookie,getCookie } from "../hooks/cookie";
const Login = () => {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const { user,dispatch } = useContext(AuthContext);
  
  const handleClick = async (e) => {
    e.preventDefault();
    await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
      removeCookie("token");
      removeCookie("authorization");

      // console.log(response.data);
      const cookieVal={
        id:response.data.user._id,
        username:response.data.user.username,
      };
      setCookie("token",JSON.stringify(cookieVal), { path: "/" });
      // const tt=await getCookie("token");
      // console.log(tt.id);
      window.localStorage.setItem("isLogged", true);
      
  };
  
  return (
    <div className="reg" style={{fontFamily: "sans-serif", fontSize: "20px", display:"flex", justifyContent:"center"}}>
        <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
      
      <div className="innerdiv">
      <h1>Login</h1>
      
        <form onSubmit={handleClick}>
          <input
            placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
          />
          <input
            placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
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