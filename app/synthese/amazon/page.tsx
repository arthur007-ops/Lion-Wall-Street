"use client";

import { useState } from "react";

const amazonData = {
  name: "Amazon",
  symbol: "AMZN",
  logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png",
  exchange: "NASDAQ",
  sector: "E-commerce & Cloud",
  description:
    "Amazon opère dans l’e-commerce, le cloud computing, la logistique et les services numériques, avec AWS comme moteur majeur de rentabilité et de croissance.",
  news: [
    {
      title: "Amazon reste suivie pour la dynamique d’AWS",
      summary:
        "Les investisseurs regardent l’évolution du cloud, les marges et la capacité du groupe à maintenir son rythme de croissance.",
      date: "Juillet 2026",
    },
    {
      title: "Le marché surveille la profitabilité du e-commerce",
      summary:
        "L’amélioration des coûts logistiques et de l’efficacité opérationnelle reste un thème important pour le dossier Amazon.",
      date: "Juillet 2026",
    },
    {
      title: "La publicité et les services soutiennent l’intérêt du marché",
      summary:
        "Les activités à plus forte marge comme la publicité et le cloud renforcent la lecture positive du modèle économique.",
      date: "Juin 2026",
    },
  ],
  financials: {
    revenue: "638B$",
    netIncome: "30B$",
    cash: "86B$",
    debt: "136B$",
    freeCashFlow: "36B$",
  },
  estimates: {
    epsEstimate: "1.05",
    revenueEstimate: "158.7B$",
    lastQuarterSurprise: "+5.0%",
    analystView:
      "Consensus favorable, avec une attention particulière portée à AWS, aux marges retail et à la progression des activités publicitaires.",
  },
  sources: [
    {
      category: "Relations investisseurs",
      title: "Amazon Investor Relations",
      description:
        "Page principale pour suivre les résultats, les communiqués, les lettres aux actionnaires et les documents officiels d’Amazon.",
      url: "https://ir.aboutamazon.com/overview/default.aspx",
    },
    {
      category: "Résultats trimestriels",
      title: "Amazon Quarterly Results",
      description:
        "Hub officiel qui centralise les publications trimestrielles d’Amazon, pratique pour retrouver rapidement les résultats par période.",
      url: "https://ir.aboutamazon.com/quarterly-results/default.aspx",
    },
    {
      category: "Documents réglementaires",
      title: "Amazon Q1 2026 SEC release",
      description:
        "Document réglementaire utile pour vérifier les ventes, le résultat opérationnel, le net income et les commentaires de gestion du trimestre.",
      url: "https://www.sec.gov/Archives/edgar/data/1018724/000101872426000012/amzn-20260331xex991.htm",
    },
    {
      category: "Résultats annuels / T4",
      title: "Amazon.com Announces Fourth Quarter Results",
      description:
        "Publication officielle utile pour les chiffres annuels, AWS, le cash-flow opérationnel et le free cash flow sur douze mois glissants.",
      url: "https://ir.aboutamazon.com/news-release/news-release-details/2026/Amazon-com-Announces-Fourth-Quarter-Results/",
    },
    {
      category: "Consensus analystes",
      title: "Yahoo Finance – Amazon earnings expectations",
      description:
        "Source pratique pour les attentes de marché sur l’EPS, le chiffre d’affaires, AWS et la surprise de résultats.",
      url: "https://finance.yahoo.com/sectors/technology/article/amazon-q1-revenue-tops-estimates-as-aws-hits-15-quarter-growth-high-1322513",
    },
  ],
};

export default function AmazonPage() {
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
                src={amazonData.logo}
                alt={amazonData.name}
                className="h-16 w-16 rounded-full bg-white object-contain p-2"
              />
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Entreprise
                </p>
                <h1 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                  {amazonData.name}
                </h1>
                <p className="mt-2 text-gray-400">
                  {amazonData.exchange} • {amazonData.symbol} • {amazonData.sector}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
              Suivi société, actualités, bilans et attentes du marché.
            </div>
          </div>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
            {amazonData.description}
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
                {amazonData.news.map((item, index) => (
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
                    {amazonData.financials.revenue}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Résultat net</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {amazonData.financials.netIncome}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Trésorerie</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {amazonData.financials.cash}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Dette</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {amazonData.financials.debt}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Free Cash Flow</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {amazonData.financials.freeCashFlow}
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
                    {amazonData.estimates.epsEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-gray-400">Chiffre d’affaires estimé</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {amazonData.estimates.revenueEstimate}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Surprise dernier trimestre</p>
                  <p className="mt-2 text-3xl font-bold text-white">
                    {amazonData.estimates.lastQuarterSurprise}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                  <p className="text-sm text-gray-400">Lecture du consensus</p>
                  <p className="mt-2 text-lg text-gray-300">
                    {amazonData.estimates.analystView}
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
                Amazon.
              </p>

              <div className="mt-6 grid gap-4">
                {amazonData.sources.map((source, index) => (
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