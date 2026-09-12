import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Homepage from "./widgets/homepage";
import Login from "./components/login";
import RegistrationForm from "./components/register";
import MyForm from "./components/createProfile";
import Home from "./components/home";
import JobForm from "./components/jobpostform";
import Dashboard from "./components/userdashboard";
import Allposts from "./widgets/allposts";
import Messenger from "./pages/messenger/messenger";
import ApplyForm from "./components/applyform/applyform";
import Resume from "./components/ResumeBuilder/App";
import AppLayout from "./routes/AppLayout";
import NotFound from "./routes/NotFound";
import { AnonymousRoute, ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />

          <Route element={<AnonymousRoute />}>
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<RegistrationForm />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/user/createProfile" element={<MyForm />} />
            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/user/jobpostform" element={<JobForm />} />
              <Route path="/user/profile/:userId" element={<Dashboard />} />
              <Route path="/user/allposts" element={<Allposts />} />
              <Route path="/user/messenger" element={<Messenger />} />
              <Route path="/user/applyform/:postId" element={<ApplyForm />} />
              <Route path="/resume" element={<Resume />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
