import React, {useRef } from 'react';
import axios from "axios";
import { Link, Navigate, useNavigate } from 'react-router-dom';

import "../css/home.css";
const RegistrationForm = () => {
  // State to hold form data
  
  
  const navigate = useNavigate();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const response = await axios.post("/user/register", user);
        console.log(response);
        navigate("/user/createProfile");
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  return (
    <div className='reg' style={{fontFamily: "sans-serif", fontSize: "20px",display:"flex", justifyContent:"center"}}>
    <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
    <div className='innerdiv'>
      <h2>Sign Up</h2>
      
      <form onSubmit={handleClick}>
        <label>
          Username:
          <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
          />
        </label>
        <label>
          Email:
          <input
            placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
          />
        </label>
        <label>
          Password:
          <input
            placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
          />
        </label>
        <label>
          Password Again:
          <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
        </label>
        <button type="submit" style={{width: "35%"}}>Sign Up</button>
      </form>
      <h4>Already have an account ?</h4>
      <span onClick={()=>{
            navigate("/user/login");
          }} style={{cursor:"pointer" , color:"purple", fontWeight:"bold"}}>Login</span>
    
    </div>
    </div>
  );
};

export default RegistrationForm;