import { useEffect, useState } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchData() {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(url, { credentials: "include" });
      const result = await response.json();

      if (response.status === 401)
        throw new Error("Sesión inexistente. Iniciá sesión nuevamente.");
      if (response.status === 403)
        throw new Error("No tenés permisos para ver esto.");
      if (response.status === 500)
        throw new Error("Error interno del servidor. Intentá más tarde.");
      if (!response.ok)
        throw new Error(result.message || "No se pudieron obtener los datos.");

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
