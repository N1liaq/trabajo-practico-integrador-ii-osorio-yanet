import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useForm from "../hooks/useForm.hook.js";

const API_URL = import.meta.env.VITE_API_URL;

const inputClass =
  "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

const fields = [
  { name: "username", placeholder: "Usuario", type: "text" },
  { name: "email", placeholder: "Email", type: "text" },
  { name: "password", placeholder: "Contraseña", type: "password" },
  { name: "first_name", placeholder: "Nombre", type: "text" },
  { name: "last_name", placeholder: "Apellido", type: "text" },
];

function RegisterPage() {
  const navigate = useNavigate();
  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });
      const result = await response.json();

      if (response.status === 201) {
        handleReset();
        navigate("/login", {
          state: { message: "¡Registro exitoso! Ya podés iniciar sesión." },
        });
      } else if (response.status === 400) {
        setErrors(Array.isArray(result) ? result : ["Datos inválidos"]);
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
        <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>

        {errors.length > 0 && (
          <ul className="bg-red-100 text-red-700 p-2 rounded text-sm list-disc list-inside">
            {errors.map((msg) => (
              <li key={msg}>{msg}</li>
            ))}
          </ul>
        )}

        {fields.map((field) => (
          <input
            key={field.name}
            type={field.type}
            name={field.name}
            value={formState[field.name]}
            onChange={handleInputChange}
            placeholder={field.placeholder}
            className={inputClass}
          />
        ))}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
        >
          {isLoading ? "Registrando..." : "Registrarme"}
        </button>

        <p className="text-sm text-center">
          ¿Ya tenés cuenta?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Iniciá sesión
          </Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;
