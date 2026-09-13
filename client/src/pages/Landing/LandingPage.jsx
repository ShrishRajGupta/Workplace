import { Link } from "react-router-dom";
import HeroLayout from "../../components/HeroLayout/HeroLayout";

const LandingPage = () => (
  <HeroLayout variant="landing">
    <h1 style={{ textAlign: "left", marginBottom: "10px" }}>Welcome to WorkPlace</h1>
    <div>
      <Link to="/user/login">
        <button style={{ margin: "0 10px" }}>Login</button>
      </Link>
      <Link to="/user/register">
        <button style={{ margin: "0 10px" }}>Signup</button>
      </Link>
    </div>
  </HeroLayout>
);

export default LandingPage;
