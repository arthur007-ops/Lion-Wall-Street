"use client";

import { useState } from "react";

const dellData = {
  name: "Dell Technologies",
  symbol: "DELL",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/330px-Dell_Logo.svg.png",
  exchange: "NYSE",
  sector: "Infrastructure & Matériel",
  description:
    "Dell Technologies développe des solutions d’infrastructure informatique, de serveurs, de stockage, de PC et de services associés, avec une exposition importante aux investissements des entreprises et aux besoins croissants en capacités de calcul.",
  news: [
    {
      title: "Dell profite de l’intérêt pour l’infrastructure IA",
      summary:
        "Les investisseurs observent la demande en serveurs, en capacités de data center et la place de Dell dans les dépenses technologiques des entreprises.",
      date: "Juillet 2026",
    },
    {
      title: "Le marché surveille la dynamique des marges",
      summary:
        "L’attention reste portée sur la capacité du groupe à transformer la demande infrastructurelle en amélioration de rentabilité.",
      date: "Juillet 2026",
    },
    {
      title: "Les dépenses IT des entreprises restent un facteur clé",
      summary:
        "Les analystes suivent la visibilité des commandes, l’évolution du segment solutions d’infrastructure et les effets de cycle sur le matériel.",
      date: "Juin 2026",
    },
  ],
  financials: {
    revenue: "88B$",
    netIncome: "4B$",
    cash: "10B$",
    debt: "25B$",
    freeCashFlow: "5B$",
  },
  estimates: {
    epsEstimate: "2.18",
    revenueEstimate: "24.6B$",
    lastQuarterSurprise: "+2.9%",
    analystView:
      "Consensus plutôt constructif, avec un focus sur les serveurs, les solutions liées à l’IA, la demande entreprise et l’évolution des marges.",
  },
  sources: [
    {
      category: "Relations investisseurs",
      title: "Dell Technologies Investor Relations",
      description:
        "Page principale pour accéder aux résultats, présentations, communiqués et informations financières officielles de Dell Technologies.",
      url: "https://investors.delltechnologies.com/",
    },
    {
      category: "Documents réglementaires",
      title: "Dell Technologies SEC Filings",
      description:
        "Accès officiel aux rapports annuels, trimestriels et autres dépôts SEC pour vérifier les chiffres détaillés.",
      url: "https://investors.delltechnologies.com/financial-information/sec-filings",
    },
    {
      category: "Résultats trimestriels",
      title: "Dell Q1 fiscal 2027 earnings release (SEC Exhibit 99.1)",
      description:
        "Document utile pour les revenus, EPS, cash flow opérationnel et commentaires de management sur la dynamique IA et serveurs.",
      url: "https://www.sec.gov/Archives/edgar/data/1571996/000157199626000021/exhibit991earnings8kq1fy27.htm",
    },
    {
      category: "Résultats annuels",
      title: "Dell Technologies Delivers Fourth Quarter and Full-Year Fiscal 2026 Results",
      description:
        "Publication officielle utile pour les chiffres annuels, la trajectoire de revenus et les principaux éléments financiers de l’exercice.",
      url: "https://investors.delltechnologies.com/news-releases/news-release-details/dell-technologies-delivers-fourth-quarter-and-full-yea",
    },
    {
      category: "Consensus analystes",
      title: "Yahoo Finance / Zacks – Dell Q1 earnings beat estimates",
      description:
        "Source pratique pour suivre la surprise de résultats, les attentes du consensus et la lecture marché autour de Dell.",
      url: "https://finance.yahoo.com/markets/stocks/articles/dell-q1-earnings-beat-estimates-161900954.html",
    },
  ],
};

export default function DellPage() {
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
                src={dellData.logo}
                alt={dellData.name}
                className="h-16 w-16 rounded-full bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Entreprise
                </p>
                <h1 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                  {dellData.name}
                </h1>
                <p className="mt-2 text-gray-400">
                  {dellData.exchange} • {dellData.symbol} • {dellData.sector}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
              Suivi société, actualités, bilans et attentes du marché.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {dellData.description}
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
                {dellData.news.map((item, index) => (
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
                    {dellData.financials.revenue}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Résultat net</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {dellData.financials.netIncome}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trésorerie</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {dellData.financials.cash}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Dette</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {dellData.financials.debt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Free Cash Flow</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {dellData.financials.freeCashFlow}
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
                    {dellData.estimates.epsEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {dellData.estimates.revenueEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Surprise dernier trimestre</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {dellData.estimates.lastQuarterSurprise}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Lecture du consensus</p>
                  <p className="mt-2 text-lg text-gray-300">
                    {dellData.estimates.analystView}
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
                Dell Technologies.
              </p>

              <div className="mt-6 grid gap-4">
                {dellData.sources.map((source, index) => (
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