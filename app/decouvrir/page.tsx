import Link from "next/link";

const trendingCompanies = [
  {
    name: "Sandisk",
    symbol: "SNDK",
    logo: "https://support.sandisk.com/images/kb/sandisk-app-icon.png",
    growth: "+539.01% YTD",
    theme: "Stockage / Semi-conducteurs",
    reason: "L’une des plus fortes progressions du S&P 500 en 2026.",
  },
  {
    name: "Dell Technologies",
    symbol: "DELL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/330px-Dell_Logo.svg.png",
    growth: "+223.33% YTD",
    theme: "Matériel / IA",
    reason: "Portée par la demande en serveurs et infrastructures liées à l’IA.",
  },
  {
    name: "Micron",
    symbol: "MU",
    logo: "https://images.seeklogo.com/logo-png/44/1/micron-logo-png_seeklogo-446070.png",
    growth: "+200%+ YTD",
    theme: "Mémoire / IA",
    reason: "Très suivie grâce à la demande en mémoire HBM pour les systèmes IA.",
  },
  {
    name: "Intel",
    symbol: "INTC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
    growth: "+257% YTD",
    theme: "Semi-conducteurs",
    reason: "Retour en force en 2026 parmi les meilleures performances de l’indice.",
  },
  {
    name: "Western Digital",
    symbol: "WDC",
    logo: "https://www.also.com/ec/cms5/media/img/6110_1/herstellerseiten/wd/wdlogo.jpg",
    growth: "Forte hausse en 2026",
    theme: "Stockage / Data",
    reason: "Très regardée pour son exposition à la croissance des data centers.",
  },
  {
    name: "Vertiv",
    symbol: "VRT",
    logo: "https://play-lh.googleusercontent.com/898QW7Xa1NpisoJjSmaefB49RL27ADFJTLaczU8Ecor22ZTWjkqmEuxXJlApP_uKUlWvp7sJYinq4t7j2n_-1vo",
    growth: "Momentum fort",
    theme: "Infrastructure / Data centers",
    reason: "Valeur suivie pour l’alimentation et le refroidissement des centres de données.",
  },
];

export default function DecouvrirPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-center text-5xl font-bold text-yellow-400">
          Découvrir
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-300">
          Bienvenue dans la page Découvrir de Lion Wall Street.
        </p>

        <p className="mx-auto mt-2 max-w-3xl text-center text-base text-gray-400">
          Ici, tu pourras retrouver des entreprises en vogue, des sociétés à forte croissance,
          et des idées de suivi pour tes prochaines analyses de marché.
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
              Une sélection d’entreprises actuellement très suivies pour leur performance,
              leur dynamique de marché ou leur exposition à l’intelligence artificielle,
              aux semi-conducteurs et aux infrastructures numériques.
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
                  <span className="text-sm text-gray-500">
                    Suivi marché US
                  </span>

                  <Link
  href={`/graphique?symbol=${encodeURIComponent(company.symbol)}`}
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