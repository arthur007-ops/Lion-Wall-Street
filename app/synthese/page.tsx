"use client";

import Link from "next/link";
import { useState } from "react";

const companies = [
  {
    name: "Apple",
    symbol: "AAPL",
    href: "/synthese/apple",
    logo: "https://www.freeiconspng.com/uploads/apple-icon-27.png",
    exchange: "NASDAQ",
    sector: "Technologie",
  },
  {
    name: "Microsoft",
    symbol: "MSFT",
    href: "/synthese/microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png",
    exchange: "NASDAQ",
    sector: "Logiciels",
  },
  {
    name: "Amazon",
    symbol: "AMZN",
    href: "/synthese/amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png",
    exchange: "NASDAQ",
    sector: "E-commerce",
  },
  {
    name: "Google",
    symbol: "GOOGL",
    href: "/synthese/google",
    logo: "https://www.webrankinfo.com/dossiers/wp-content/uploads/google-logo-carre-2015-09-400.png",
    exchange: "NASDAQ",
    sector: "Internet",
  },
  {
    name: "Meta",
    symbol: "META",
    href: "/synthese/meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
    exchange: "NASDAQ",
    sector: "Réseaux sociaux",
  },
  {
    name: "Tesla",
    symbol: "TSLA",
    href: "/synthese/tesla",
    logo: "https://img.icons8.com/win10/1200/tesla-logo.jpg",
    exchange: "NASDAQ",
    sector: "Automobile",
  },
  {
    name: "NVIDIA",
    symbol: "NVDA",
    href: "/synthese/nvidia",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/4/47/Nvidia_%28logo%29.svg/1280px-Nvidia_%28logo%29.svg.png",
    exchange: "NASDAQ",
    sector: "Semi-conducteurs",
  },
  {
    name: "Netflix",
    symbol: "NFLX",
    href: "/synthese/netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Netflix_2016_N_logo.svg",
    exchange: "NASDAQ",
    sector: "Streaming",
  },
  {
    name: "Dell Technologies",
    symbol: "DELL",
    href: "/synthese/dell",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/330px-Dell_Logo.svg.png",
    exchange: "NYSE",
    sector: "Infrastructure",
  },
  {
    name: "Micron Technology",
    symbol: "MU",
    href: "/synthese/micron",
    logo: "https://images.seeklogo.com/logo-png/44/1/micron-logo-png_seeklogo-446070.png",
    exchange: "NASDAQ",
    sector: "Mémoire",
  },
];

export default function SynthesePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = companies.filter((company) => {
    const search = searchTerm.toLowerCase();

    return (
      company.name.toLowerCase().includes(search) ||
      company.symbol.toLowerCase().includes(search) ||
      company.sector.toLowerCase().includes(search) ||
      company.exchange.toLowerCase().includes(search)
    );
  });

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
            Lion Wall Street
          </p>
          <h1 className="mt-4 text-5xl font-bold text-yellow-400">
            Synthèse entreprises
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Cliquez sur une entreprise pour consulter ses actualités, ses bilans
            financiers et les estimations du marché.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <div className="rounded-3xl border border-white/10 bg-zinc-900 p-3 shadow-2xl">
            <input
              type="text"
              placeholder="Rechercher une entreprise, un ticker, un secteur..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-black px-5 py-4 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400/30"
            />
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          {filteredCompanies.length} entreprise{filteredCompanies.length > 1 ? "s" : ""} trouvée{filteredCompanies.length > 1 ? "s" : ""}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCompanies.map((company) => (
            <Link
              key={company.symbol}
              href={company.href}
              className="group rounded-3xl border border-white/10 bg-zinc-900 p-6 shadow-2xl transition hover:-translate-y-1 hover:border-yellow-400/20 hover:bg-zinc-800"
            >
              <div className="flex items-center gap-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-14 w-14 rounded-full bg-white object-contain p-2"
                />
                <div>
                  <h2 className="text-xl font-semibold text-white transition group-hover:text-yellow-300">
                    {company.name}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {company.symbol} • {company.exchange}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="rounded-full border border-yellow-400/20 bg-yellow-400/5 px-3 py-1 text-xs font-medium text-yellow-300">
                  {company.sector}
                </span>

                <span className="text-sm font-medium text-gray-400 transition group-hover:text-yellow-300">
                  Voir la fiche →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900 p-10 text-center shadow-2xl">
            <h2 className="text-2xl font-semibold text-yellow-400">
              Aucun résultat
            </h2>
            <p className="mt-3 text-gray-300">
              Essayez avec un nom d’entreprise, un ticker comme AAPL ou un secteur comme Technologie.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}