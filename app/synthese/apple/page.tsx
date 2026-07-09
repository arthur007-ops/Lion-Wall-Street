"use client";

import { useState } from "react";

const appleData = {
  name: "Apple",
  symbol: "AAPL",
  logo: "https://www.freeiconspng.com/uploads/apple-icon-27.png",
  exchange: "NASDAQ",
  sector: "Technologie",
  description:
    "Apple conçoit des produits électroniques, des logiciels et des services, avec un poids majeur dans l’iPhone, les wearables et les services numériques.",
  news: [
    {
      title: "Apple prépare sa prochaine publication de résultats",
      summary:
        "Le marché surveille les ventes d’iPhone, la progression des services et la dynamique des marges.",
      date: "Juillet 2026",
    },
    {
      title: "Les investisseurs suivent la demande sur les nouveaux produits",
      summary:
        "Les attentes restent concentrées sur la capacité d’Apple à maintenir sa croissance dans un environnement plus concurrentiel.",
      date: "Juillet 2026",
    },
    {
      title: "Le segment services reste un point clé du dossier",
      summary:
        "Les revenus récurrents et la profitabilité du segment services continuent d’attirer l’attention du marché.",
      date: "Juin 2026",
    },
  ],
  financials: {
    revenue: "383B$",
    netIncome: "97B$",
    cash: "67B$",
    debt: "111B$",
    freeCashFlow: "99B$",
  },
  estimates: {
    epsEstimate: "1.42",
    revenueEstimate: "84.3B$",
    lastQuarterSurprise: "+3.2%",
    analystView:
      "Consensus globalement positif, avec attention portée aux marges et aux services.",
  },
  sources: [
    {
      category: "Relations investisseurs",
      title: "Apple Investor Relations",
      description:
        "Page principale pour les résultats, présentations, calendrier et documents officiels.",
      url: "https://investor.apple.com/investor-relations/default.aspx",
    },
    {
      category: "Résultats trimestriels",
      title: "Apple reports second quarter results",
      description:
        "Communiqué officiel Apple sur les résultats du T2 fiscal 2026, utile pour les revenus, EPS, marges et commentaires de direction.",
      url: "https://www.apple.com/newsroom/2026/04/apple-reports-second-quarter-results/",
    },
    {
      category: "Résultats trimestriels",
      title: "Apple reports first quarter results",
      description:
        "Communiqué officiel Apple sur les résultats du T1 fiscal 2026, utile pour les records de revenus, EPS et génération de cash.",
      url: "https://www.apple.com/newsroom/2026/01/apple-reports-first-quarter-results/",
    },
    {
      category: "Documents réglementaires",
      title: "Apple SEC Filings",
      description:
        "Accès aux rapports 10-K, 10-Q et autres dépôts SEC pour vérifier les états financiers détaillés.",
      url: "https://investor.apple.com/sec-filings/default.aspx",
    },
    {
      category: "Consensus analystes",
      title: "Yahoo Finance – Apple earnings expectations",
      description:
        "Source pratique pour suivre les attentes de marché, le consensus EPS et chiffre d’affaires, ainsi que les surprises de résultats.",
      url: "https://finance.yahoo.com/news/apple-stock-rises-after-q2-earnings-top-estimates-on-strong-iphone-china-sales-174442778.html",
    },
  ],
};

export default function ApplePage() {
  const [activeTab, setActiveTab] = useState<
    "news" | "financials" | "estimates" | "sources"
  >("news");

  const tabs = [
    { id: "news", label: "Actualités" },
    { id: "financials", label: "Bilans" },
    { id: "estimates", label: "Estimations" },
    { id: "sources", label: "Sources" },
  ] as const;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={appleData.logo}
                alt={appleData.name}
                className="h-16 w-16 rounded-full bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Entreprise
                </p>
                <h1 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                  {appleData.name}
                </h1>
                <p className="mt-2 text-gray-400">
                  {appleData.exchange} • {appleData.symbol} • {appleData.sector}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
              Suivi société, actualités, bilans et attentes du marché.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {appleData.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-2xl border px-5 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                    : "border-white/10 bg-white/5 text-gray-300 hover:border-yellow-400/20 hover:bg-yellow-400/5 hover:text-yellow-300"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
          {activeTab === "news" && (
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400">
                Actualités
              </h2>
              <div className="mt-6 grid gap-4">
                {appleData.news.map((item, index) => (
                  <article
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-white">
                        {item.title}
                      </h3>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <p className="mt-3 text-gray-300">{item.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === "financials" && (
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400">
                Bilans financiers
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.financials.revenue}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Résultat net</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.financials.netIncome}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trésorerie</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.financials.cash}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Dette</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.financials.debt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Free Cash Flow</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.financials.freeCashFlow}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "estimates" && (
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400">
                Estimations
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">EPS estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.estimates.epsEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">
                    Chiffre d’affaires estimé
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.estimates.revenueEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">
                    Surprise dernier trimestre
                  </p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {appleData.estimates.lastQuarterSurprise}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Lecture du consensus</p>
                  <p className="mt-2 text-lg text-gray-300">
                    {appleData.estimates.analystView}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sources" && (
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400">
                Sources
              </h2>
              <p className="mt-3 max-w-3xl text-gray-300">
                Cette section regroupe les liens utilisés pour documenter les
                chiffres, le consensus et les principaux éléments de suivi sur
                Apple.
              </p>

              <div className="mt-6 grid gap-4">
                {appleData.sources.map((source, index) => (
                  <article
                    key={index}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70">
                      {source.category}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {source.title}
                    </h3>
                    <p className="mt-3 text-gray-300">{source.description}</p>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20"
                    >
                      Ouvrir la source
                    </a>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}