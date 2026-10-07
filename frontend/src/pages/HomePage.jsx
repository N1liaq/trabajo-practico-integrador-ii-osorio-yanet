import { URL_Api } from "../config.js";
import { useFetch } from "../hooks/useFetch.js";

export const HomePage = () => {
  const { data: articles, isLoading, error } = useFetch(`${URL_Api}/articles`);

  if (isLoading) {
    return (
      <p className="p-6 text-center text-gray-500">Cargando artículos...</p>
    );
  }

  if (error) {
    return (
      <p className="m-6 rounded-lg bg-red-100 p-4 text-center font-semibold text-red-700">
        {error}
      </p>
    );
  }

  return (
    <section className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Artículos publicados
      </h1>

      {articles.length === 0 ? (
        <p className="rounded-lg bg-gray-100 p-4 text-center text-gray-600">
          Todavía no hay artículos publicados.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li
              key={article.id}
              className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h2>
                <p className="flex-1 text-gray-600">{article.excerpt}</p>
                <p className="text-sm text-gray-500">
                  Por {article.author?.usermame ?? "Autor desconocido"}
                </p>
              </h2>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
