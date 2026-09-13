import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

// Shared chrome for every logged-in screen; the navbar is declared once here.
const AppLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default AppLayout;
