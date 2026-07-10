"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const trendingCompanies = [
  {
    name: "Micron Technology",
    symbol: "MU",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Micron_Technology_logo_2024.svg&width=240",
    growth: "Très suivie en 2026",
    theme: "Mémoire / IA",
    reason:
      "Bénéficie de la demande en mémoire liée aux serveurs IA et à l’infrastructure de calcul.",
  },
  {
    name: "Vertiv Holdings",
    symbol: "VRT",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Vertiv_logo.svg&width=240",
    growth: "Momentum fort",
    theme: "Infrastructure / Data centers",
    reason:
      "Très suivie pour l’alimentation, le refroidissement et les équipements critiques des centres de données.",
  },
  {
    name: "Dell Technologies",
    symbol: "DELL",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Dell_Technologies_logo.svg&width=240",
    growth: "Forte dynamique",
    theme: "Serveurs / IA",
    reason:
      "Portée par la demande en serveurs et en matériel d’infrastructure liés au cycle d’investissement IA.",
  },
  {
    name: "Sandisk",
    symbol: "SNDK",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/SanDisk_2024_logo.svg&width=240",
    growth: "Parmi les meilleures performances 2026",
    theme: "Stockage / Semi-conducteurs",
    reason:
      "Remarquée pour sa très forte performance en 2026 dans l’univers mémoire et stockage.",
  },
  {
    name: "Western Digital",
    symbol: "WDC",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Western_Digital_logo.svg&width=240",
    growth: "Forte attention marché",
    theme: "Stockage / Data",
    reason:
      "Profite de l’intérêt croissant pour le stockage lié aux besoins des data centers et de l’IA.",
  },
  {
    name: "Seagate Technology",
    symbol: "STX",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Seagate_logo.svg&width=240",
    growth: "Surveillance renforcée",
    theme: "Stockage / Infrastructures",
    reason:
      "Suivie pour son exposition au stockage de données dans un contexte de hausse des besoins numériques.",
  },
  {
    name: "Modine Manufacturing",
    symbol: "MOD",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Modine.svg&width=240",
    growth: "Momentum de niche",
    theme: "Refroidissement / IA",
    reason:
      "Regardée pour son exposition au refroidissement, un maillon clé dans l’expansion des infrastructures IA.",
  },
  {
    name: "Palantir Technologies",
    symbol: "PLTR",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Palantir_company_logo.png&width=240",
    growth: "Valeur offensive",
    theme: "Logiciels / IA",
    reason:
      "Très observée pour sa position dans les logiciels de données et d’intelligence artificielle.",
  },
  {
    name: "Microsoft",
    symbol: "MSFT",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Microsoft_logo.svg&width=240",
    growth: "Leader structurel",
    theme: "Cloud / IA",
    reason:
      "Reste une valeur centrale de l’IA grâce à son cloud, ses outils logiciels et ses investissements massifs.",
  },
  {
    name: "Meta Platforms",
    symbol: "META",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Meta_Platforms_Inc._logo.svg&width=240",
    growth: "Toujours en vue",
    theme: "Plateforme / IA",
    reason:
      "Surveillée pour ses investissements dans l’IA et sa puissance financière dans les plateformes numériques.",
  },
];

export default function DecouvrirPage() {
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
          Découvrir
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-300">
          Bienvenue dans la page Découvrir de Lion Wall Street.
        </p>

        <p className="mx-auto mt-2 max-w-3xl text-center text-base text-gray-400">
          Ici, tu peux retrouver des entreprises en vogue, des sociétés à forte
          croissance et des idées de suivi pour tes prochaines analyses de marché.
        </p>

        <div className="mt-16">
          <div className="mb-8 flex flex-col items-center text-center">
            <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-1 text-sm text-yellow-300">
              Tendances du moment
            </span>

            <h2 className="mt-4 text-3xl font-semibold text-white">
              Entreprises à forte croissance
            </h2>

            <p className="mt-3 max-w-2xl text-gray-400">
              Une sélection d’entreprises très suivies pour leur dynamique de
              marché et leur exposition à l’intelligence artificielle, aux
              semi-conducteurs, au stockage, à l’énergie et aux infrastructures
              numériques.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {trendingCompanies.map((company) => (
              <div
                key={company.symbol}
                className="group rounded-3xl border border-white/10 bg-zinc-900/80 p-6 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-zinc-900"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-14 w-14 rounded-full bg-white object-contain p-2"
                    />

                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {company.name}
                      </h3>
                      <p className="text-sm text-gray-400">{company.symbol}</p>
                    </div>
                  </div>

                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    {company.growth}
                  </span>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs text-yellow-300">
                    {company.theme}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">
                    En vogue
                  </span>
                </div>

                <p className="mt-5 text-sm leading-6 text-gray-400">
                  {company.reason}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Suivi marché US</span>

                  <Link
                    href="/graphique"
                    className="rounded-xl bg-yellow-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-300"
                  >
                    Voir le graphique
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}