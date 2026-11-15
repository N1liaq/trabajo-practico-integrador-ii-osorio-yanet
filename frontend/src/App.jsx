import { BrowserRouter } from "react-router";
// import Navbar from "./components/Navbar.component.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <RegisterPage />
    </BrowserRouter>
  );
}

export default App;
