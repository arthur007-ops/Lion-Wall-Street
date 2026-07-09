"use client";

import { useState } from "react";

const microsoftData = {
  name: "Microsoft",
  symbol: "MSFT",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png",
  exchange: "NASDAQ",
  sector: "Logiciels & Cloud",
  description:
    "Microsoft développe des logiciels, services cloud et solutions d’infrastructure, avec des positions majeures dans Windows, Office, Azure et l’intelligence artificielle.",
  news: [
    {
      title: "Microsoft reste surveillée sur la croissance d’Azure",
      summary:
        "Les investisseurs suivent la trajectoire du cloud, la monétisation de l’IA et la solidité des marges.",
      date: "Juillet 2026",
    },
    {
      title: "Le marché attend de nouvelles preuves sur l’effet IA",
      summary:
        "L’intégration de l’IA dans les produits Microsoft reste l’un des grands moteurs de valorisation du dossier.",
      date: "Juillet 2026",
    },
    {
      title: "Les revenus récurrents du segment entreprise soutiennent le dossier",
      summary:
        "La visibilité offerte par les abonnements et les contrats enterprise reste un point fort pour la société.",
      date: "Juin 2026",
    },
  ],
  financials: {
    revenue: "245B$",
    netIncome: "88B$",
    cash: "80B$",
    debt: "75B$",
    freeCashFlow: "74B$",
  },
  estimates: {
    epsEstimate: "3.10",
    revenueEstimate: "64.8B$",
    lastQuarterSurprise: "+4.1%",
    analystView:
      "Consensus favorable, avec une attention forte portée à Azure, aux marges et à la contribution des produits liés à l’IA.",
  },
  sources: [
    {
      category: "Relations investisseurs",
      title: "Microsoft Investor Relations",
      description:
        "Page principale pour accéder aux publications, résultats, rapports, dividendes et informations investisseurs officielles.",
      url: "https://www.microsoft.com/en-us/investor/default",
    },
    {
      category: "Documents réglementaires",
      title: "Microsoft SEC Filings",
      description:
        "Page officielle qui centralise les dépôts réglementaires trimestriels et annuels de Microsoft.",
      url: "https://www.microsoft.com/en-us/investor/sec-filings",
    },
    {
      category: "Résultats trimestriels",
      title: "Microsoft FY26 Q3 – Press Release & Webcast",
      description:
        "Source officielle utile pour les revenus, le net income, l’EPS, les commentaires sur Azure et la dynamique cloud/IA.",
      url: "https://www.microsoft.com/en-us/investor/earnings/fy-2026-q3/press-release-webcast",
    },
    {
      category: "Résultats trimestriels",
      title: "Microsoft Cloud and AI strength fuels third quarter results",
      description:
        "Version newsroom du communiqué trimestriel, pratique pour une lecture rapide des points clés liés au cloud et à l’IA.",
      url: "https://news.microsoft.com/source/2026/04/29/microsoft-cloud-and-ai-strength-fuels-third-quarter-results/",
    },
    {
      category: "Consensus analystes",
      title: "Yahoo Finance – Microsoft analyst estimates",
      description:
        "Source pratique pour suivre les attentes de marché sur les résultats, le chiffre d’affaires et le consensus analystes.",
      url: "https://sg.finance.yahoo.com/quote/MSFT.SN/analysis/",
    },
  ],
};

export default function MicrosoftPage() {
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
                src={microsoftData.logo}
                alt={microsoftData.name}
                className="h-16 w-16 rounded-full bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Entreprise
                </p>
                <h1 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                  {microsoftData.name}
                </h1>
                <p className="mt-2 text-gray-400">
                  {microsoftData.exchange} • {microsoftData.symbol} • {microsoftData.sector}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
              Suivi société, actualités, bilans et attentes du marché.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {microsoftData.description}
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
                {microsoftData.news.map((item, index) => (
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
                    {microsoftData.financials.revenue}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Résultat net</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {microsoftData.financials.netIncome}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trésorerie</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {microsoftData.financials.cash}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Dette</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {microsoftData.financials.debt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Free Cash Flow</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {microsoftData.financials.freeCashFlow}
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
                    {microsoftData.estimates.epsEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {microsoftData.estimates.revenueEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Surprise dernier trimestre</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {microsoftData.estimates.lastQuarterSurprise}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Lecture du consensus</p>
                  <p className="mt-2 text-lg text-gray-300">
                    {microsoftData.estimates.analystView}
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
                Microsoft.
              </p>

              <div className="mt-6 grid gap-4">
                {microsoftData.sources.map((source, index) => (
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