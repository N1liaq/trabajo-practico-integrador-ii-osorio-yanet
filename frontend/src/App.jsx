import { BrowserRouter } from "react-router";
import Navbar from "./components/Navbar.component.jsx";

Navbar;
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <h1 className="text-3xl font-bold text-yellow-600 flex items-center justify-center m-8">
        Sistema de Gestión de Blog Personal
      </h1>
    </BrowserRouter>
  );
}

export default App;
