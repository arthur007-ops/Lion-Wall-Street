import Link from "next/link";

const articles = [
  {
    title: "Reuters Markets",
    description: "Les dernières actualités marchés, actions, économie et finance mondiale.",
    source: "Reuters",
    url: "https://www.reuters.com/markets/",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/5638c68e13b594803ce56208acc695f539eae8c1.jpg",
  },
  {
    title: "Bloomberg Markets",
    description: "Actualités business, marchés, données financières et analyses globales.",
    source: "Bloomberg",
    url: "https://www.bloomberg.com/markets",
    image: "https://pplx-res.cloudinary.com/image/upload/pplx_search_images/3546254cf7fbb7132c600c8ef7385a5834abe65b.jpg",
  },
  {
    title: "CNBC Markets",
    description: "Suivi des marchés américains, indices, obligations, forex et matières premières.",
    source: "CNBC",
    url: "https://www.cnbc.com/markets/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/CNBC_logo.svg/960px-CNBC_logo.svg.png",
  },
];

export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-center text-5xl font-bold text-yellow-400">
          Newsletter
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-300">
          Retrouve ici une sélection de sources d’information finance et marchés.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.title}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg"
            >
              <img
                src={article.image}
                alt={article.source}
                className="h-40 w-full rounded-xl object-cover bg-white"
                loading="lazy"
              />

              <p className="mt-4 text-sm uppercase tracking-wide text-yellow-400">
                {article.source}
              </p>

              <h2 className="mt-3 text-2xl font-semibold text-white">
                {article.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-300">
                {article.description}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-300"
              >
                Lire l’article
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
        </div>
      </section>
    </main>
  );
}