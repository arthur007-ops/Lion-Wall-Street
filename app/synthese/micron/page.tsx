"use client";

import { useState } from "react";

const micronData = {
  name: "Micron Technology",
  symbol: "MU",
  logo: "https://images.seeklogo.com/logo-png/44/1/micron-logo-png_seeklogo-446070.png",
  exchange: "NASDAQ",
  sector: "Mémoire & Semi-conducteurs",
  description:
    "Micron Technology est spécialisée dans les mémoires DRAM, NAND et solutions de stockage, avec une activité très sensible aux cycles du marché des semi-conducteurs, à la demande liée à l’intelligence artificielle et à l’évolution des prix mémoire.",
  news: [
    {
      title: "Micron reste suivie sur la reprise du cycle mémoire",
      summary:
        "Les investisseurs surveillent la demande en mémoire, la dynamique de prix et l’exposition croissante du groupe aux besoins liés à l’intelligence artificielle.",
      date: "Juillet 2026",
    },
    {
      title: "Le marché observe la progression des marges",
      summary:
        "La capacité de Micron à bénéficier d’un meilleur environnement de prix reste un point central dans l’analyse du dossier.",
      date: "Juillet 2026",
    },
    {
      title: "Les data centers et l’IA soutiennent l’intérêt pour la valeur",
      summary:
        "Les analystes regardent la profondeur de la demande structurelle pour les composants mémoire dans les infrastructures de nouvelle génération.",
      date: "Juin 2026",
    },
  ],
  financials: {
    revenue: "31B$",
    netIncome: "7B$",
    cash: "9B$",
    debt: "14B$",
    freeCashFlow: "5B$",
  },
  estimates: {
    epsEstimate: "1.76",
    revenueEstimate: "8.7B$",
    lastQuarterSurprise: "+6.1%",
    analystView:
      "Consensus constructif, avec une attention forte sur les prix mémoire, la demande IA, la discipline d’offre et la poursuite du redressement cyclique.",
  },
  sources: [
    {
      category: "Relations investisseurs",
      title: "Micron Investor Relations",
      description:
        "Page principale pour accéder aux publications, résultats, événements investisseurs et documents officiels de Micron.",
      url: "https://investors.micron.com/",
    },
    {
      category: "Résultats trimestriels",
      title: "Micron Quarterly Results",
      description:
        "Hub officiel des résultats trimestriels, pratique pour retrouver rapidement les communiqués financiers de Micron.",
      url: "https://investors.micron.com/quarterly-results",
    },
    {
      category: "Documents réglementaires",
      title: "Micron Q3 fiscal 2026 press release / SEC filing",
      description:
        "Source utile pour les revenus, le net income, la trésorerie, le cash-flow opérationnel et le free cash flow ajusté du trimestre.",
      url: "https://www.sec.gov/Archives/edgar/data/723125/000072312526000013/a2026q3ex991-pressrelease.htm",
    },
    {
      category: "Résultats trimestriels",
      title: "Micron reports record results for third quarter fiscal 2026",
      description:
        "Communiqué officiel Micron Investor Relations, utile pour compléter la lecture sur l’IA, la mémoire HBM et les perspectives.",
      url: "https://investors.micron.com/news-releases/news-release-details/micron-technology-inc-reports-record-results-third-quarter",
    },
    {
      category: "Consensus analystes",
      title: "Yahoo Finance – Micron Q3 earnings beat estimates",
      description:
        "Source pratique pour suivre le consensus marché, la surprise de résultats et les attentes sur l’EPS et le chiffre d’affaires.",
      url: "https://finance.yahoo.com/video/micron-q3-earnings-far-surpass-202158400.html",
    },
  ],
};

export default function MicronPage() {
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
                src={micronData.logo}
                alt={micronData.name}
                className="h-16 w-16 rounded-full bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Entreprise
                </p>
                <h1 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                  {micronData.name}
                </h1>
                <p className="mt-2 text-gray-400">
                  {micronData.exchange} • {micronData.symbol} • {micronData.sector}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
              Suivi société, actualités, bilans et attentes du marché.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {micronData.description}
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
                {micronData.news.map((item, index) => (
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
                    {micronData.financials.revenue}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Résultat net</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {micronData.financials.netIncome}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trésorerie</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {micronData.financials.cash}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Dette</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {micronData.financials.debt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Free Cash Flow</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {micronData.financials.freeCashFlow}
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
                    {micronData.estimates.epsEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {micronData.estimates.revenueEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Surprise dernier trimestre</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {micronData.estimates.lastQuarterSurprise}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Lecture du consensus</p>
                  <p className="mt-2 text-lg text-gray-300">
                    {micronData.estimates.analystView}
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
                Micron Technology.
              </p>

              <div className="mt-6 grid gap-4">
                {micronData.sources.map((source, index) => (
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