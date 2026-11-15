import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="bg-pink-900 text-white px-4 py-3 flex items-center justify-between">
      <Link to="/" className="font-bold text-lg hover:underline">
        Home
      </Link>
      <button className="bg-white text-purple-900 px-3 py-1 rounded hover:bg-gray-100">
        Cerrar sesión
      </button>
    </nav>
  );
}

export default Navbar;
