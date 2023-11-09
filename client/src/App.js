import {BrowserRouter,Route,Routes} from "react-router-dom";
import JobForm from "./components/jobpostform";
import Navbar from "./components/navbar";
import Dashboard from "./components/userdashboard";
function App() {
  return (
    <div className="App" style={{backgroundColor:"#e5e8e3"}}>
    <Navbar />
    <BrowserRouter>
      <Routes>
        <Route path = "/jobpostform" element={<JobForm />}></Route>
        <Route path = "/profile" element={<Dashboard />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
