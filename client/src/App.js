import {BrowserRouter,Route,Routes} from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import RegistrationForm from "./components/register";
import UserWidget from "./widgets/UserWidget";
import { useState } from "react";
import { SearchResultsList } from "./components/SearchResultsList";
import MyForm from "./components/createProfile";
function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App" style={{backgroundColor:"#e5e8e3"}}>
    <Navbar setResults={setResults}/>
    <SearchResultsList results={results}/>
    <BrowserRouter>
      <Routes>
        <Route path = "/jobpostform" element={<JobForm />}></Route>
        <Route path="/user/createProfile" element={<MyForm />}></Route>
        <Route path = "/profile" element={<Dashboard />}></Route>
        <Route path = "/" element={/*<UserWidget userId={_id} picturePath={picturePath}/>*/ <RegistrationForm />}></Route>
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

