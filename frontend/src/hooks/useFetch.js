import { useCallback, useEffect, useState } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = useCallback(async () => {
    try {
      const response = await fetch(url, { credentials: "include" });

      if (!response.ok) {
        const messages = {
          401: "Sesión inexistente o expirada. Iniciá sesión nuevamente.",
          403: "No tenés permisos para ver este contenido.",
          500: "Error interno del servidor. Intentá nuevamente más tarde.",
        };
        throw new Error(
          messages[response.status] ?? "No se pudo obtener la información",
        );
      }

      const result = await response.json();
      setData(result);
      setError(null);
    } catch (error) {
      setError(
        error instanceof TypeError
          ? "No se pudo conectar con el servidor."
          : error.message,
      );
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { data, isLoading, error };
};
