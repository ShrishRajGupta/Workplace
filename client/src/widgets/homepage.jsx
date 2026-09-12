import { Link } from "react-router-dom";
import "../css/home.css";

const HERO_IMAGE =
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

const Homepage = () => (
  <div className="home">
    <img src={HERO_IMAGE} alt="" style={{ height: "650px" }} />
    <div className="innerdiv1">
      <h1 style={{ textAlign: "left", marginBottom: "10px" }}>Welcome to WorkPlace</h1>
      <div>
        <Link to="/user/login">
          <button style={{ margin: "0 10px" }}>Login</button>
        </Link>
        <Link to="/user/register">
          <button style={{ margin: "0 10px" }}>Signup</button>
        </Link>
      </div>
    </div>
  </div>
);

export default Homepage;
