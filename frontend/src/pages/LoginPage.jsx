import { useState } from "react";
import { Link } from "react-router";
import useForm from "../hooks/useForm.hook.js";

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

function LoginPage() {
  const { formState, handleInputChange } = useForm({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-6 rounded-lg shadow space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>

        {errors.length > 0 && (
          <ul className="bg-red-100 text-red-700 p-2 rounded text-sm">
            {errors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        )}

        <input
          type="text"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
          placeholder="Email"
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
