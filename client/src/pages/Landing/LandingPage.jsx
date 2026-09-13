import { Link } from "react-router-dom";
import HeroLayout from "../../components/HeroLayout/HeroLayout";

const LandingPage = () => (
  <HeroLayout variant="landing">
    <p className="hero__brand">
      <img src="/icons8-job-64.png" alt="" />
      Workplace
    </p>
    <h1>Find your next role. Hire your next colleague.</h1>
    <p className="hero__lede">
      Post jobs, apply in a click, chat with employers in real time and build your resume, all in one place.
    </p>
    <div className="hero__actions">
      <Link to="/user/register">
        <button className="btn--light">Create an account</button>
      </Link>
      <Link to="/user/login">
        <button className="btn--outline">Log in</button>
      </Link>
    </div>
  </HeroLayout>
);

export default LandingPage;
