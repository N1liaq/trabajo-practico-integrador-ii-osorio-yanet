import { useState } from "react";
import { Link, useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      localStorage.removeItem("isLogged");
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-pink-800 text-white px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-bold text-lg hover:underline">
        Home
      </Link>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="bg-white text-purple-800 px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50"
      >
        {isLoading ? "Saliendo..." : "Logout"}
      </button>
    </nav>
  );
}

export default Navbar;
