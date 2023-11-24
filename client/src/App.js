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
import Homepage from "./widgets/homepage";


function App() {
  const [results, setResults] = useState([]);
  

  return (
    <div className="App">
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><SearchResultsList results={results}/><Homepage /></>} ></Route>
        
        <Route path ="/home" element={<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Home /></>}></Route>
        <Route path ="/user/jobpostform" element={<><Navbar setResults={setResults}/><SearchResultsList results={results}/><JobForm /></>}></Route>
        <Route path="/user/register" element={<><SearchResultsList results={results}/><RegistrationForm /></>}></Route>
        <Route path="/user/login" element={<><SearchResultsList results={results}/><Login/></>}></Route>
        <Route path="/user/createProfile" element={<><SearchResultsList results={results}/><MyForm /></>}></Route>
        <Route path ="/user/profile/:userId" element={<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Dashboard /></>}></Route>
        <Route path="/user/allposts" element={<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Allposts /></>}></Route>
        <Route exact path="/messenger" element={<><Navbar setResults={setResults}/><SearchResultsList results={results}/><Chat /></>}></Route>
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

