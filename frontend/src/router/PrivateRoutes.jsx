import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";

function PrivateRoutes() {
  const isLogged = localStorage.getItem("isLogged") === "true";

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PrivateRoutes;
