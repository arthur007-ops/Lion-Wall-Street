"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
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
          Apprenez à faire travailler votre argent avec nous.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-gray-300"
        >
          Lion Wall Street est un univers dédié à la finance, à l’investissement et à l’analyse de marché,
          avec une approche simple, moderne et ambitieuse pour vous apprendres les rouages de la bourse.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28 }}
          className="mt-8"
        >
          <Link
            href="/test-supabase"
            className="inline-flex items-center rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20"
          >
            Tester la connexion Supabase
          </Link>
        </motion.div>

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