import { Link } from "react-router-dom";

const NotFound = () => (
  <main style={{ padding: "3rem 1rem", textAlign: "center" }}>
    <h1>Page not found</h1>
    <p>The page you were looking for does not exist.</p>
    <Link to="/home">Go to home</Link>
  </main>
);

export default NotFound;
