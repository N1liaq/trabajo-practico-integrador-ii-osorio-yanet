import { Outlet } from "react-router";
import Navbar from "../components/Navbar.component.jsx";

function PrivateRoutes() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PrivateRoutes;
