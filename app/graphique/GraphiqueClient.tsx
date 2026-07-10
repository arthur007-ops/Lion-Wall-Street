"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const companies = [
  {
    name: "Apple",
    symbol: "AAPL",
    logo: "https://www.freeiconspng.com/uploads/apple-icon-27.png",
    tvSymbol: "NASDAQ:AAPL",
  },
  {
    name: "Microsoft",
    symbol: "MSFT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png",
    tvSymbol: "NASDAQ:MSFT",
  },
  {
    name: "Amazon",
    symbol: "AMZN",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png",
    tvSymbol: "NASDAQ:AMZN",
  },
  {
    name: "Google",
    symbol: "GOOGL",
    logo: "https://www.webrankinfo.com/dossiers/wp-content/uploads/google-logo-carre-2015-09-400.png",
    tvSymbol: "NASDAQ:GOOGL",
  },
  {
    name: "Meta",
    symbol: "META",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYE5xf8GvwQfTSFZ4V7UGexg2IxWIlK78DVqzDV5gQPA&s=10",
    tvSymbol: "NASDAQ:META",
  },
  {
    name: "Tesla",
    symbol: "TSLA",
    logo: "https://img.icons8.com/win10/1200/tesla-logo.jpg",
    tvSymbol: "NASDAQ:TSLA",
  },
  {
    name: "NVIDIA",
    symbol: "NVDA",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/4/47/Nvidia_%28logo%29.svg/1280px-Nvidia_%28logo%29.svg.png",
    tvSymbol: "NASDAQ:NVDA",
  },
  {
    name: "Netflix",
    symbol: "NFLX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Netflix_2016_N_logo.svg",
    tvSymbol: "NASDAQ:NFLX",
  },
  {
    name: "Sandisk",
    symbol: "SNDK",
    logo: "https://support.sandisk.com/images/kb/sandisk-app-icon.png",
    tvSymbol: "NASDAQ:SNDK",
  },
  {
    name: "Dell Technologies",
    symbol: "DELL",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/330px-Dell_Logo.svg.png",
    tvSymbol: "NYSE:DELL",
  },
  {
    name: "Micron Technology",
    symbol: "MU",
    logo: "https://images.seeklogo.com/logo-png/44/1/micron-logo-png_seeklogo-446070.png",
    tvSymbol: "NASDAQ:MU",
  },
  {
    name: "Intel",
    symbol: "INTC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
    tvSymbol: "NASDAQ:INTC",
  },
  {
    name: "Western Digital",
    symbol: "WDC",
    logo: "https://www.also.com/ec/cms5/media/img/6110_1/herstellerseiten/wd/wdlogo.jpg",
    tvSymbol: "NASDAQ:WDC",
  },
  {
    name: "Vertiv Holdings",
    symbol: "VRT",
    logo: "https://play-lh.googleusercontent.com/898QW7Xa1NpisoJjSmaefB49RL27ADFJTLaczU8Ecor22ZTWjkqmEuxXJlApP_uKUlWvp7sJYinq4t7j2n_-1vo",
    tvSymbol: "NYSE:VRT",
  },
  {
    name: "Lumentum Holdings",
    symbol: "LITE",
    logo: "https://cignal.ai/wp-content/uploads/2016/02/lumentum_featuredimage.png",
    tvSymbol: "NASDAQ:LITE",
  },
  {
    name: "Advanced Micro Devices",
    symbol: "AMD",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/AMD_Logo.svg&width=240",
    tvSymbol: "NASDAQ:AMD",
  },
  {
    name: "Taiwan Semiconductor",
    symbol: "TSM",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Logo_Taiwan_Semiconductor_Manufacturing_Company.svg&width=240",
    tvSymbol: "NYSE:TSM",
  },
  {
    name: "Broadcom",
    symbol: "AVGO",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Broadcom_logo_(2016-present).svg&width=240",
    tvSymbol: "NASDAQ:AVGO",
  },
  {
    name: "Palantir Technologies",
    symbol: "PLTR",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Palantir_company_logo.png&width=240",
    tvSymbol: "NASDAQ:PLTR",
  },
  {
    name: "ServiceNow",
    symbol: "NOW",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/ServiceNow_logo.svg&width=240",
    tvSymbol: "NYSE:NOW",
  },
  {
    name: "Arista Networks",
    symbol: "ANET",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Arista-networks-logo.svg&width=240",
    tvSymbol: "NYSE:ANET",
  },
  {
    name: "Adobe",
    symbol: "ADBE",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Adobe_Corporate_logo.svg&width=240",
    tvSymbol: "NASDAQ:ADBE",
  },
  {
    name: "Salesforce",
    symbol: "CRM",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Salesforce.com_logo.svg&width=240",
    tvSymbol: "NYSE:CRM",
  },
  {
    name: "Oracle",
    symbol: "ORCL",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/Oracle_logo.svg&width=240",
    tvSymbol: "NYSE:ORCL",
  },
  {
    name: "ASML Holding",
    symbol: "ASML",
    logo: "https://commons.wikimedia.org/w/index.php?title=Special:Redirect/file/ASML_Holding_N.V._logo.svg&width=240",
    tvSymbol: "NASDAQ:ASML",
  },
];

const cac40Companies = [
  { name: "Accor", symbol: "AC", logo: "", tvSymbol: "EURONEXT:AC", enabled: true },
  { name: "Air Liquide", symbol: "AI", logo: "", tvSymbol: "EURONEXT:AI", enabled: true },
  { name: "Airbus", symbol: "AIR", logo: "", tvSymbol: "EURONEXT:AIR", enabled: true },
  { name: "ArcelorMittal", symbol: "MT", logo: "", tvSymbol: "EURONEXT:MT", enabled: true },
  { name: "AXA", symbol: "CS", logo: "", tvSymbol: "EURONEXT:CS", enabled: true },
  { name: "BNP Paribas", symbol: "BNP", logo: "", tvSymbol: "EURONEXT:BNP", enabled: true },
  { name: "Bouygues", symbol: "EN", logo: "", tvSymbol: "EURONEXT:EN", enabled: true },
  { name: "Capgemini", symbol: "CAP", logo: "", tvSymbol: "EURONEXT:CAP", enabled: true },
  { name: "Carrefour", symbol: "CA", logo: "", tvSymbol: "EURONEXT:CA", enabled: true },
  { name: "Crédit Agricole", symbol: "ACA", logo: "", tvSymbol: "EURONEXT:ACA", enabled: true },
  { name: "Danone", symbol: "BN", logo: "", tvSymbol: "EURONEXT:BN", enabled: true },
  { name: "Dassault Systèmes", symbol: "DSY", logo: "", tvSymbol: "EURONEXT:DSY", enabled: true },
  { name: "Edenred", symbol: "EDEN", logo: "", tvSymbol: "EURONEXT:EDEN", enabled: true },
  { name: "Engie", symbol: "ENGI", logo: "", tvSymbol: "EURONEXT:ENGI", enabled: true },
  { name: "EssilorLuxottica", symbol: "EL", logo: "", tvSymbol: "EURONEXT:EL", enabled: true },
  { name: "Eurofins Scientific", symbol: "ERF", logo: "", tvSymbol: "EURONEXT:ERF", enabled: true },
  { name: "Hermès", symbol: "RMS", logo: "", tvSymbol: "EURONEXT:RMS", enabled: true },
  { name: "Kering", symbol: "KER", logo: "", tvSymbol: "EURONEXT:KER", enabled: true },
  { name: "Legrand", symbol: "LR", logo: "", tvSymbol: "EURONEXT:LR", enabled: true },
  { name: "L'Oréal", symbol: "OR", logo: "", tvSymbol: "EURONEXT:OR", enabled: true },
  { name: "LVMH", symbol: "MC", logo: "", tvSymbol: "EURONEXT:MC", enabled: true },
  { name: "Michelin", symbol: "ML", logo: "", tvSymbol: "EURONEXT:ML", enabled: true },
  { name: "Orange", symbol: "ORA", logo: "", tvSymbol: "EURONEXT:ORA", enabled: true },
  { name: "Pernod Ricard", symbol: "RI", logo: "", tvSymbol: "EURONEXT:RI", enabled: true },
  { name: "Publicis Groupe", symbol: "PUB", logo: "", tvSymbol: "EURONEXT:PUB", enabled: true },
  { name: "Renault", symbol: "RNO", logo: "", tvSymbol: "EURONEXT:RNO", enabled: true },
  { name: "Safran", symbol: "SAF", logo: "", tvSymbol: "EURONEXT:SAF", enabled: true },
  { name: "Saint-Gobain", symbol: "SGO", logo: "", tvSymbol: "EURONEXT:SGO", enabled: true },
  { name: "Sanofi", symbol: "SAN", logo: "", tvSymbol: "EURONEXT:SAN", enabled: true },
  { name: "Schneider Electric", symbol: "SU", logo: "", tvSymbol: "EURONEXT:SU", enabled: true },
  { name: "Société Générale", symbol: "GLE", logo: "", tvSymbol: "EURONEXT:GLE", enabled: true },
  { name: "Stellantis", symbol: "STLAP", logo: "", tvSymbol: "EURONEXT:STLAP", enabled: true },
  { name: "STMicroelectronics", symbol: "STMPA", logo: "", tvSymbol: "EURONEXT:STMPA", enabled: true },
  { name: "Teleperformance", symbol: "TEP", logo: "", tvSymbol: "EURONEXT:TEP", enabled: true },
  { name: "Thales", symbol: "HO", logo: "", tvSymbol: "EURONEXT:HO", enabled: true },
  { name: "TotalEnergies", symbol: "TTE", logo: "", tvSymbol: "EURONEXT:TTE", enabled: false },
  { name: "Unibail-Rodamco-Westfield", symbol: "URW", logo: "", tvSymbol: "EURONEXT:URW", enabled: true },
  { name: "Veolia Environnement", symbol: "VIE", logo: "", tvSymbol: "EURONEXT:VIE", enabled: true },
  { name: "Vinci", symbol: "DG", logo: "", tvSymbol: "EURONEXT:DG", enabled: true },
  { name: "Worldline", symbol: "WLN", logo: "", tvSymbol: "EURONEXT:WLN", enabled: true },
];

const allCompanies = [...companies, ...cac40Companies];

export default function GraphiqueClient() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return companies;

    return allCompanies.filter((company) => {
      return (
        company.name.toLowerCase().includes(normalizedSearch) ||
        company.symbol.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchTerm]);

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

      <section className="relative mx-auto max-w-5xl">
        <h1 className="text-center text-5xl font-bold text-yellow-400">
          Graphique
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-300">
          Sélectionnez une entreprise pour afficher son graphique en direct et suivre son évolution.
        </p>

        <Link
          href="/graphique/simulateur"
          className="mx-auto mt-10 block max-w-3xl rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6 transition hover:border-yellow-400/40 hover:bg-yellow-400/10 focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
          aria-label="Accéder au simulateur de portefeuille virtuel"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-yellow-400/70">
            Nouveau module
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-yellow-400">
            Simulateur de portefeuille
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-300">
            Accédez à un portefeuille virtuel pour vous entraîner à la bourse, suivre vos positions et tester vos décisions sans risque réel.
          </p>
          <div className="mt-5 inline-flex items-center text-sm font-medium text-yellow-300">
            Ouvrir le simulateur <span className="ml-2">→</span>
          </div>
        </Link>

        <div className="mx-auto mt-12 max-w-xl">
          <label className="mb-3 block text-sm font-medium text-gray-300">
            Entreprise sélectionnée
          </label>

          <button
            onClick={() => setOpen(!open)}
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left shadow-lg transition hover:bg-white/10"
          >
            <span className="flex items-center gap-3">
              <img
                src={selected.logo}
                alt={selected.name}
                className="h-8 w-8 rounded-full bg-white object-contain p-1"
              />
              <span>
                {selected.name}{" "}
                <span className="text-gray-400">({selected.symbol})</span>
              </span>
            </span>

            <span
              className={`text-yellow-400 transition-transform duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              ⌄
            </span>
          </button>

          <div
            className={`mt-3 origin-top rounded-2xl border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-300 ease-out ${
              open
                ? "visible max-h-[420px] translate-y-0 scale-100 opacity-100"
                : "invisible max-h-0 -translate-y-2 scale-95 opacity-0"
            }`}
          >
            <div className="max-h-[420px] overflow-y-auto overscroll-contain">
              <div className="sticky top-0 z-10 border-b border-white/10 bg-zinc-900 p-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher une entreprise..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-yellow-400/40"
                />
              </div>

              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <button
                    key={company.symbol}
                    onClick={() => {
                      setSelected(company);
                      setOpen(false);
                      setSearchTerm("");
                    }}
                    className="flex w-full items-center gap-3 border-b border-white/5 px-5 py-4 text-left transition hover:bg-white/5 last:border-b-0"
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="h-8 w-8 rounded-full bg-white object-contain p-1"
                    />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">
                        {company.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {company.symbol}
                      </p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-5 py-6 text-sm text-gray-400">
                  Aucune entreprise trouvée.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 p-4 shadow-2xl">
          <div className="mb-4 flex items-center gap-3">
            <img
              src={selected.logo}
              alt={selected.name}
              className="h-10 w-10 rounded-full bg-white object-contain p-1"
            />
            <div>
              <h2 className="text-2xl font-semibold text-yellow-400">
                {selected.name}
              </h2>
              <p className="text-sm text-gray-400">{selected.symbol}</p>
            </div>
          </div>

          <div className="h-[500px] w-full overflow-hidden rounded-xl">
            <iframe
              key={selected.symbol}
              title={`TradingView ${selected.name} Chart`}
              src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${selected.symbol}&symbol=${encodeURIComponent(
                selected.tvSymbol
              )}&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=0&toolbarbg=0f0f0f&theme=dark&style=1&timezone=Etc%2FUTC&withdateranges=1&hidevolume=0&allow_symbol_change=1`}
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-6 text-center">
          <p className="text-gray-300">
            Vous consultez actuellement le graphique de{" "}
            <span className="font-semibold text-yellow-400">
              {selected.name} ({selected.symbol})
            </span>.
          </p>
        </div>
      </section>
    </main>
  );
}