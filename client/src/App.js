import {BrowserRouter,Route,Routes} from "react-router-dom";
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
import axios from "axios";
import {Context}  from ".";


function App() {
  const [results, setResults] = useState([]);
  

  return (
    <div className="App" style={{backgroundColor:"white"}}>
    <Navbar setResults={setResults}/>
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchResultsList results={results}/>} ></Route>
        
        <Route path ="/home" element={<Home />}></Route>
        <Route path ="/user/jobpostform" element={<JobForm />}></Route>
        <Route path="/user/register" element={<RegistrationForm />}></Route>
        <Route path="/user/login" element={<Login/>}></Route>
        <Route path="/user/createProfile" element={<MyForm />}></Route>
        <Route path ="/user/profile/:userId" element={<Dashboard />}></Route>
        <Route path="/user/allposts" element={<Allposts />}></Route>
        <Route exact path="/messenger" element={<Chat />}></Route>
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

