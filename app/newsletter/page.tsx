"use client";

import Link from "next/link";
import { motion } from "framer-motion";

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

      <section className="relative mx-auto max-w-6xl">
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
                className="h-40 w-full rounded-xl bg-white object-cover"
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
                className="mt-6 inline-block rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300"
              >
                Lire l’article
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center"></div>
      </section>
    </main>
  );
}