import React, { useContext, useState } from 'react';
import axios from "axios";
import { Context }from "../index";
import { Link, Navigate, useNavigate } from 'react-router-dom';

import "../css/home.css";
import { removeCookie,setCookie,getCookie } from '../hooks/cookie';
const RegistrationForm = () => {
  // State to hold form data
  
  const  {isAuthenticated,setisAuthenticated}= useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  // Handle form submission
  const handleFormSubmit = async (e) => {
  
    e.preventDefault();
    
    try {
      const response = await axios.post("/user/register", formData);
  
      if (response.status === 200) {
      removeCookie("token");
        const cookieVal={
          id:response.data.user._id,
          username:response.data.user.username,
        };
        setCookie("token",JSON.stringify(cookieVal), { path: "/" });
       
        setisAuthenticated(true);
        console.log(isAuthenticated);
      }
    } catch (error) {
      setisAuthenticated(false);
      console.error('Error registering user', error);
    }
    console.log(isAuthenticated);
    
  };
  if(isAuthenticated){
    return <Navigate to={'/user/createProfile'} />;
  }
  return (
    <div className='reg' style={{fontFamily: "sans-serif", fontSize: "20px",display:"flex", justifyContent:"center"}}>
    <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
    <div className='innerdiv'>
      <h2>Sign Up</h2>
      
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
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