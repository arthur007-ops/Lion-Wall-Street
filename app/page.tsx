"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-[120%] rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute right-1/2 top-40 h-80 w-80 translate-x-[130%] rounded-full bg-yellow-300/10 blur-3xl" />
      </div>

      <section className="relative mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full border border-yellow-400/40 px-4 py-2 text-sm text-yellow-300"
        >
          Finance • Investment • Newsletter
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Image
            src="/logoLWS.png"
            alt="Lion Wall Street"
            width={64}
            height={64}
            priority
            className="h-14 w-14 object-contain md:h-16 md:w-16"
          />

          <span className="text-lg font-medium uppercase tracking-[0.25em] text-yellow-300 md:text-xl">
            Lion Wall Street
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-4xl text-5xl font-bold text-yellow-400 md:text-7xl"
        >
          Décrypter les marchés. Construire une vision.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-gray-300"
        >
          Lion Wall Street est un univers dédié à la finance, à l’investissement et à l’analyse de marché,
          avec une approche claire, moderne et ambitieuse.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.35,
              },
            },
          }}
          className="mt-14 grid w-full max-w-5xl gap-6 md:grid-cols-3"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Marchés</h2>
            <p className="mt-3 text-sm text-gray-300">
              Une lecture des tendances, des mouvements et des signaux importants.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Analyses</h2>
            <p className="mt-3 text-sm text-gray-300">
              Des idées, réflexions et contenus pour mieux comprendre l’investissement.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Newsletter</h2>
            <p className="mt-3 text-sm text-gray-300">
              Un point de contact direct pour partager les actualités et contenus exclusifs.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}