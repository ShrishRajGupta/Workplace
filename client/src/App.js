import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import CreateProfilePage from "./pages/CreateProfile/CreateProfilePage";
import FeedPage from "./pages/Feed/FeedPage";
import PostJobPage from "./pages/PostJob/PostJobPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import MyPostsPage from "./pages/MyPosts/MyPostsPage";
import MessengerPage from "./pages/Messenger/MessengerPage";
import ApplyPage from "./pages/Apply/ApplyPage";
import MyApplicationsPage from "./pages/Applications/MyApplicationsPage";
import ApplicantsPage from "./pages/Applicants/ApplicantsPage";
import ResumeBuilderPage from "./pages/ResumeBuilder/ResumeBuilderPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import AppLayout from "./routes/AppLayout";
import { AnonymousRoute, ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AnonymousRoute />}>
            <Route path="/user/login" element={<LoginPage />} />
            <Route path="/user/register" element={<RegisterPage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/user/createProfile" element={<CreateProfilePage />} />
            <Route element={<AppLayout />}>
              <Route path="/home" element={<FeedPage />} />
              <Route path="/user/jobpostform" element={<PostJobPage />} />
              <Route path="/user/profile/:userId" element={<ProfilePage />} />
              <Route path="/user/allposts" element={<MyPostsPage />} />
              <Route path="/user/messenger" element={<MessengerPage />} />
              <Route path="/user/applyform/:postId" element={<ApplyPage />} />
              <Route path="/user/applications" element={<MyApplicationsPage />} />
              <Route path="/user/posts/:postId/applicants" element={<ApplicantsPage />} />
              <Route path="/resume" element={<ResumeBuilderPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
