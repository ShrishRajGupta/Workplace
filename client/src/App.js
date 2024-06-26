import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import RegistrationForm from "./components/register";
import Home from "./components/home";
import React, { useContext, useEffect, useState } from "react";
import MyForm from "./components/createProfile";
import Login from "./components/login";
import Allposts from "./widgets/allposts";
import Homepage from "./widgets/homepage";
import Messenger from "./pages/messenger/messenger";
import { AuthContext } from "./context/AuthContext";import Resume from "./components/ResumeBuilder/App";
import ApplyForm from "./components/applyform/applyform";

function App() {
  
  const isLogged = localStorage.getItem("isLogged");const {user} = useContext(AuthContext);
  return (
    <div className="App">
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Homepage /></>} ></Route>
        <Route path="/user/register" element={<><RegistrationForm /></>}></Route>
        <Route path="/user/login" element={<><Login/></>}></Route>
        <Route path="/resume" element={isLogged?<><Resume /></>:<><Login/> </>}></Route>
        <Route path ="/home" element={isLogged?<><Navbar /><Home /></>:<><Login/></>}></Route>
        <Route path ="/user/jobpostform" element={isLogged?<><Navbar /><JobForm /></>:<><Login/></>}></Route>
        <Route path="/user/createProfile" element={isLogged?<><MyForm /></>:<><Login/></>}></Route>
        <Route path ="/user/profile/:userId" element={isLogged?<><Navbar /><Dashboard /></>:<><Login/></>}></Route>
        <Route path="/user/allposts" element={isLogged?<><Navbar /><Allposts /></>:<><Login/></>}></Route>
        <Route exact path="/user/messenger" element={isLogged?<><Navbar /><Messenger /></>:<React.Fragment><Login/></React.Fragment>}></Route>
        <Route path="/user/applyform/:userId" element={isLogged?<><Navbar /><ApplyForm /></>:<><Login/></>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}


{/*
Comment added by Shreyansh:
  1. Add twitterlogo, linkedinlogo in UserWidget.jsx
  2. Userwidget is added on homepage, pls correct if something bothers..
  */
}

export default App;

