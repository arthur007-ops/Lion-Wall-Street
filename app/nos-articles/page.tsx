import Link from "next/link";

export default function NosArticlesPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-yellow-400">
          Nos Articles
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Retrouvez ici mes propres articles sur la finance, l’investissement et les marchés.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-5xl">
        <article className="rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl transition hover:border-yellow-400/20 hover:bg-zinc-800">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-yellow-300">
                Retraite
              </span>

              <h2 className="mt-5 text-3xl font-bold text-white md:text-4xl">
                La retraite par capitalisation ou retraite par répartition ?
              </h2>

              <p className="mt-4 text-lg leading-8 text-gray-300">
                Deux modèles, deux logiques, deux visions de la protection sociale.
                Cet article explore leurs différences, leurs forces, leurs limites
                et les enjeux concrets pour les épargnants et les futurs retraités.
              </p>
            </div>

            <div className="w-full md:w-auto">
              <Link
                href="/nos-articles/retraite-capitalisation-ou-repartition"
                className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-yellow-300"
              >
                Lire l’article
              </Link>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}