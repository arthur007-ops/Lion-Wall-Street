"use client";

import { useState } from "react";

const metaData = {
  name: "Meta",
  symbol: "META",
  logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
  exchange: "NASDAQ",
  sector: "Réseaux sociaux & Publicité",
  description:
    "Meta exploite des plateformes sociales majeures comme Facebook, Instagram et WhatsApp, avec un modèle économique dominé par la publicité numérique et des investissements importants dans l’intelligence artificielle et la réalité mixte.",
  news: [
    {
      title: "Meta reste portée par la publicité numérique",
      summary:
        "Les investisseurs surveillent la croissance des revenus publicitaires, l’engagement des utilisateurs et la discipline sur les coûts.",
      date: "Juillet 2026",
    },
    {
      title: "Les investissements dans l’IA restent au centre des attentes",
      summary:
        "Le marché cherche à mesurer l’impact concret de l’IA sur la recommandation, la monétisation et l’efficacité publicitaire du groupe.",
      date: "Juillet 2026",
    },
    {
      title: "Reality Labs demeure un point de débat",
      summary:
        "Les analystes suivent toujours de près le niveau de dépenses et la capacité de Meta à équilibrer innovation long terme et rentabilité court terme.",
      date: "Juin 2026",
    },
  ],
  financials: {
    revenue: "165B$",
    netIncome: "62B$",
    cash: "70B$",
    debt: "18B$",
    freeCashFlow: "54B$",
  },
  estimates: {
    epsEstimate: "5.12",
    revenueEstimate: "41.6B$",
    lastQuarterSurprise: "+6.4%",
    analystView:
      "Consensus positif, avec un accent mis sur la publicité, la discipline des dépenses et la montée en puissance des outils d’IA dans l’écosystème Meta.",
  },
};

export default function MetaPage() {
  const [activeTab, setActiveTab] = useState<"news" | "financials" | "estimates">("news");

  const tabs = [
    { id: "news", label: "Actualités" },
    { id: "financials", label: "Bilans" },
    { id: "estimates", label: "Estimations" },
  ] as const;

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={metaData.logo}
                alt={metaData.name}
                className="h-16 w-16 rounded-full bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Entreprise
                </p>
                <h1 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                  {metaData.name}
                </h1>
                <p className="mt-2 text-gray-400">
                  {metaData.exchange} • {metaData.symbol} • {metaData.sector}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
              Suivi société, actualités, bilans et attentes du marché.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {metaData.description}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3" role="tablist" aria-label="Sections Meta">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
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
            <div role="tabpanel" id="panel-news" aria-labelledby="tab-news">
              <h2 className="text-2xl font-semibold text-yellow-400">
                Actualités
              </h2>
              <div className="mt-6 grid gap-4">
                {metaData.news.map((item, index) => (
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
            <div role="tabpanel" id="panel-financials" aria-labelledby="tab-financials">
              <h2 className="text-2xl font-semibold text-yellow-400">
                Bilans financiers
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.financials.revenue}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Résultat net</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.financials.netIncome}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trésorerie</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.financials.cash}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Dette</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.financials.debt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Free Cash Flow</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.financials.freeCashFlow}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "estimates" && (
            <div role="tabpanel" id="panel-estimates" aria-labelledby="tab-estimates">
              <h2 className="text-2xl font-semibold text-yellow-400">
                Estimations
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">EPS estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.estimates.epsEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.estimates.revenueEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Surprise dernier trimestre</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {metaData.estimates.lastQuarterSurprise}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Lecture du consensus</p>
                  <p className="mt-2 text-lg text-gray-300">
                    {metaData.estimates.analystView}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}