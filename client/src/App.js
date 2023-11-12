import {BrowserRouter,Route,Routes} from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
import UserWidget from "./widgets/UserWidget";
function App() {
  return (
    <div className="App" style={{backgroundColor:"#e5e8e3"}}>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path = "/jobpostform" element={<JobForm />}></Route>
        <Route path = "/profile" element={<Dashboard />}></Route>
        <Route path = "/" element={<UserWidget userId={_id} picturePath={picturePath}/>}></Route>
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

