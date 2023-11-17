import {BrowserRouter,Route,Routes} from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import RegistrationForm from "./components/register";
import UserWidget from "./widgets/UserWidget";
import MyForm from "./components/createProfile";
import Login from "./components/login";
function App() {
  return (
    <div className="App" style={{backgroundColor:"#e5e8e3"}}>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path = "/jobpostform" element={<JobForm />}></Route>
        <Route path = "/user/profile" element={<Dashboard />}></Route>
        <Route path="/user/register" element={<RegistrationForm />}></Route>
        <Route path="/user/login" element={<Login />}></Route>
        <Route path="/user/createProfile" element={<MyForm />}></Route>
        <Route path = "/home" element={<UserWidget />}></Route>
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

