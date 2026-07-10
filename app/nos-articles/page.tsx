"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NosArticlesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(250,204,21,0.16),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(253,224,71,0.12),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(234,179,8,0.10),transparent_26%),linear-gradient(135deg,#000000_0%,#120d00_25%,#3a2a00_50%,#120d00_75%,#000000_100%)] bg-[length:200%_200%] animate-[gradientMove_14s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-black/35" />

        <motion.div
          style={{ left: "50%", top: "5%", marginLeft: "-24rem" }}
          animate={{
            x: [0, 18, -12, 0],
            y: [0, 14, -10, 0],
            scale: [1, 1.03, 0.98, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl"
        />

        <motion.div
          style={{ right: "50%", top: "10rem", marginRight: "-26rem" }}
          animate={{
            x: [0, -16, 10, 0],
            y: [0, -12, 16, 0],
            scale: [1, 0.98, 1.04, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-80 w-80 rounded-full bg-yellow-300/10 blur-3xl"
        />

        <motion.div
          style={{ left: "50%", bottom: "2.5rem", marginLeft: "-8rem" }}
          animate={{
            x: [0, 10, -8, 0],
            y: [0, -18, 10, 0],
            scale: [1, 1.02, 0.99, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-64 w-64 rounded-full bg-amber-300/10 blur-3xl"
        />
      </div>

      <section className="relative mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold text-yellow-400">
          Nos Articles
        </h1>

        <p className="mt-4 text-lg text-gray-300">
          Retrouvez ici mes propres articles sur la finance, l’investissement et les marchés.
        </p>
      </section>

      <section className="relative mx-auto mt-14 max-w-5xl">
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