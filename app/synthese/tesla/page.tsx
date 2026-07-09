"use client";

import { useState } from "react";

const teslaData = {
  name: "Tesla",
  symbol: "TSLA",
  logo: "https://img.icons8.com/win10/1200/tesla-logo.jpg",
  exchange: "NASDAQ",
  sector: "Automobile & Énergie",
  description:
    "Tesla conçoit des véhicules électriques, des solutions de stockage d’énergie et des technologies logicielles liées à la conduite assistée, avec une forte sensibilité du marché à la croissance des volumes, aux marges et à l’innovation produit.",
  news: [
    {
      title: "Tesla reste surveillée sur ses marges automobiles",
      summary:
        "Les investisseurs suivent l’évolution des prix, des volumes livrés et de la rentabilité dans un environnement toujours compétitif.",
      date: "Juillet 2026",
    },
    {
      title: "Le marché attend des signaux sur les nouveaux relais de croissance",
      summary:
        "L’attention reste portée sur l’énergie, les logiciels, la conduite autonome et la capacité du groupe à ouvrir de nouveaux cycles de croissance.",
      date: "Juillet 2026",
    },
    {
      title: "Les perspectives de production restent un sujet central",
      summary:
        "Les analystes surveillent la cadence industrielle, les lancements produits et la discipline des coûts sur l’ensemble de la chaîne.",
      date: "Juin 2026",
    },
  ],
  financials: {
    revenue: "97B$",
    netIncome: "8B$",
    cash: "29B$",
    debt: "8B$",
    freeCashFlow: "4B$",
  },
  estimates: {
    epsEstimate: "0.68",
    revenueEstimate: "26.4B$",
    lastQuarterSurprise: "-1.7%",
    analystView:
      "Consensus plus partagé que sur d’autres grandes capitalisations, avec un focus sur les livraisons, les marges, l’innovation et la visibilité de la demande.",
  },
};

export default function TeslaPage() {
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
                src={teslaData.logo}
                alt={teslaData.name}
                className="h-16 w-16 rounded-full bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Entreprise
                </p>
                <h1 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                  {teslaData.name}
                </h1>
                <p className="mt-2 text-gray-400">
                  {teslaData.exchange} • {teslaData.symbol} • {teslaData.sector}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
              Suivi société, actualités, bilans et attentes du marché.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {teslaData.description}
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
                {teslaData.news.map((item, index) => (
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
                    {teslaData.financials.revenue}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Résultat net</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {teslaData.financials.netIncome}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trésorerie</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {teslaData.financials.cash}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Dette</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {teslaData.financials.debt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Free Cash Flow</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {teslaData.financials.freeCashFlow}
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
                    {teslaData.estimates.epsEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {teslaData.estimates.revenueEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Surprise dernier trimestre</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {teslaData.estimates.lastQuarterSurprise}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Lecture du consensus</p>
                  <p className="mt-2 text-lg text-gray-300">
                    {teslaData.estimates.analystView}
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