import useFetch from "../hooks/useFetch.hook.js";

const API_URL = import.meta.env.VITE_API_URL;

function HomePage() {
  const { data, isLoading, error } = useFetch(`${API_URL}/articles`);

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-gray-600">Cargando artículos...</p>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  }

  const articles = Array.isArray(data) ? data : (data?.data ?? []);

  if (articles.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        No hay artículos publicados.
      </p>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Artículos publicados</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {articles.map((article) => (
          <article key={article.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600 mt-1">{article.excerpt}</p>
            <p className="text-sm text-gray-500 mt-3">
              Autor: {article.author?.username}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
