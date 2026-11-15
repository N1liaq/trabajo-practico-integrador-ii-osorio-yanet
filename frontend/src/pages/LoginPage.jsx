import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import useForm from "../hooks/useForm.hook.js";

const API_URL = import.meta.env.VITE_API_URL;

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;
  const { formState, handleInputChange } = useForm({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("isLogged", "true");
        navigate("/");
      } else if (response.status === 400) {
        setErrors(Array.isArray(result) ? result : ["Datos inválidos"]);
      } else if (response.status === 401) {
        setErrors(["Credenciales incorrectas"]);
      } else {
        setErrors(["Error interno del servidor. Intentá más tarde."]);
      }
    } catch {
      setErrors(["No se pudo conectar con el servidor."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        {successMessage && (
          <p className="bg-green-100 text-green-700 p-2 rounded text-sm">
            {successMessage}
          </p>
        )}
        {errors.length > 0 && (
          <ul className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {errors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        )}

        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
          placeholder="Usuario"
          className={inputClass}
        />
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
          placeholder="Contraseña"
          className={inputClass}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>

        <p className="text-sm text-center">
          ¿No tenés cuenta?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Registrate
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;
