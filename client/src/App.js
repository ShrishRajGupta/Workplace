import {BrowserRouter,Route,Routes} from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import RegistrationForm from "./components/register";
<<<<<<< HEAD
import UserWidget from "./widgets/UserWidget";
=======
import Home from "./components/home";
>>>>>>> 4cccdc839bdfd40b7a49454971ba68fa690a4c1c
import { useState } from "react";
import { SearchResultsList } from "./components/SearchResultsList";
import MyForm from "./components/createProfile";
import Login from "./components/login";
import Allposts from "./widgets/allposts";

function App() {
  const [results, setResults] = useState([]);
  
  return (
    <div className="App" style={{backgroundColor:"white"}}>
    <Navbar setResults={setResults}/>
   
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path = "/home" element={<UserWidget />}></Route>
        <Route path = "/user/jobpostform" element={<JobForm />}></Route>
        <Route path = "/user/profile" element={<Dashboard />}></Route>
        <Route path="/user/register" element={<RegistrationForm />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/createProfile" element={<MyForm />}></Route>
=======
        <Route path="/" element={<SearchResultsList results={results}/>} ></Route>
        
        <Route path ="/home" element={<Home />}></Route>
        <Route path ="/user/jobpostform" element={<JobForm />}></Route>
    
        <Route path="/user/register" element={<RegistrationForm />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/createProfile" element={<MyForm />}></Route>
        <Route path ="/user/profile/:userId" element={<Dashboard />}></Route>
>>>>>>> 4cccdc839bdfd40b7a49454971ba68fa690a4c1c
        <Route path="/user/allposts" element={<Allposts />}></Route>
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

