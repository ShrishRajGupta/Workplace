import {BrowserRouter,Route,Routes} from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import RegistrationForm from "./components/register";
import UserWidget from "./widgets/UserWidget";
import { useState } from "react";
import { SearchResultsList } from "./components/SearchResultsList";
import MyForm from "./components/createProfile";
import Login from "./components/login";
import Allposts from "./widgets/allposts";
>>>>>>> 58f63d2bedb1fd8f6edd2dc4edb5ba9b99060a09
function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App" style={{backgroundColor:"#e5e8e3"}}>
    <Navbar setResults={setResults}/>
    <SearchResultsList results={results}/>
    <BrowserRouter>
      <Routes>
        <Route path = "/home" element={<UserWidget />}></Route>
        <Route path = "/user/jobpostform" element={<JobForm />}></Route>
        <Route path = "/user/profile" element={<Dashboard />}></Route>
        <Route path="/user/register" element={<RegistrationForm />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/createProfile" element={<MyForm />}></Route>
        <Route path="/user/allposts" element={<Allposts />}></Route>

>>>>>>> 58f63d2bedb1fd8f6edd2dc4edb5ba9b99060a09
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

