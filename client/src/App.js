import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import RegistrationForm from "./components/register";
import Home from "./components/home";
import { useContext, useEffect, useState } from "react";
import { SearchResultsList } from "./components/SearchResultsList";
import MyForm from "./components/createProfile";
import Login from "./components/login";
import Allposts from "./widgets/allposts";
import Chat from "./components/chat/chat";
import Homepage from "./widgets/homepage";
import Resume from "./components/ResumeBuilder/App";

function App() {
  const [results, setResults] = useState([]);
  const isLogged = localStorage.getItem("isLogged");

  return (
    <div className="App">
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><Homepage /></>} ></Route>
        <Route path="/user/register" element={<><RegistrationForm /></>}></Route>
        <Route path="/user/login" element={<><Login/></>}></Route>
        <Route path="/resume" element={isLogged?<><Resume /></>:<><Login/> </>}></Route>
        <Route path ="/home" element={isLogged?<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Home /></>:<><Login/></>}></Route>
        <Route path ="/user/jobpostform" element={isLogged?<><Navbar setResults={setResults}/><SearchResultsList results={results}/><JobForm /></>:<><Login/></>}></Route>
        <Route path="/user/createProfile" element={isLogged?<><SearchResultsList results={results}/><MyForm /></>:<><Login/></>}></Route>
        <Route path ="/user/profile/:userId" element={isLogged?<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Dashboard /></>:<><Login/></>}></Route>
        <Route path="/user/allposts" element={isLogged?<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Allposts /></>:<><Login/></>}></Route>
        <Route exact path="/messenger" element={isLogged?<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Chat /></>:<><Login/></>}></Route>
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

