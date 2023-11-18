import {BrowserRouter,Route,Routes} from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import RegistrationForm from "./components/register";
import UserWidget from "./widgets/UserWidget";
<<<<<<< HEAD
import RegistrationForm from "./components/register";
import { useState } from "react";
import { SearchResultsList } from "./components/SearchResultsList";
=======
import MyForm from "./components/createProfile";
import Login from "./components/login";
<<<<<<< HEAD
import Allposts from "./widgets/allposts";
=======
>>>>>>> ccb34bc3a3944cbc28d8a422765967a2e0b2d85a
>>>>>>> 58f63d2bedb1fd8f6edd2dc4edb5ba9b99060a09
function App() {
  const [results, setResults] = useState([]);

  return (
    <div className="App" style={{backgroundColor:"#e5e8e3"}}>
    <Navbar setResults={setResults}/>
    <SearchResultsList results={results}/>
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path = "/home" element={<UserWidget />}></Route>
        <Route path = "/user/jobpostform" element={<JobForm />}></Route>
=======
        <Route path = "/jobpostform" element={<JobForm />}></Route>
<<<<<<< HEAD
        <Route path = "/profile" element={<Dashboard />}></Route>
        <Route path = "/" element={/*<UserWidget userId={_id} picturePath={picturePath}/>*/ <RegistrationForm />}></Route>
=======
>>>>>>> 58f63d2bedb1fd8f6edd2dc4edb5ba9b99060a09
        <Route path = "/user/profile" element={<Dashboard />}></Route>
        <Route path="/user/register" element={<RegistrationForm />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/createProfile" element={<MyForm />}></Route>
<<<<<<< HEAD
        <Route path="/user/allposts" element={<Allposts />}></Route>

=======
        <Route path = "/home" element={<UserWidget />}></Route>
>>>>>>> ccb34bc3a3944cbc28d8a422765967a2e0b2d85a
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

