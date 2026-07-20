"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";

type Company = {
  name: string;
  symbol: string;
  logo: string;
  tvSymbol: string;
  enabled?: boolean;
};

type CompanyProfile = {
  name: string;
  symbol: string;
  logo: string;
  exchange: string;
  sector: string;
  description: string;
  news: {
    title: string;
    summary: string;
    date: string;
  }[];
  financials: {
    revenue: string;
    netIncome: string;
    cash: string;
    debt: string;
    freeCashFlow: string;
  };
  estimates: {
    epsEstimate: string;
    revenueEstimate: string;
    lastQuarterSurprise: string;
    analystView: string;
  };
  sources: {
    category: string;
    title: string;
    description: string;
    url: string;
  }[];
};

const companies: Company[] = [
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
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
  {
    name: "JPMorgan Chase",
    symbol: "JPM",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Logo_of_JPMorganChase_2024.svg",
    tvSymbol: "NYSE:JPM",
  },
  {
    name: "Walmart",
    symbol: "WMT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/14/Walmart_logo_%282025%29.svg",
    tvSymbol: "NASDAQ:WMT",
  },
  {
    name: "Visa",
    symbol: "V",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg",
    tvSymbol: "NYSE:V",
  },
  {
    name: "Mastercard",
    symbol: "MA",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    tvSymbol: "NYSE:MA",
  },
  {
    name: "Coca-Cola",
    symbol: "KO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg",
    tvSymbol: "NYSE:KO",
  },
  {
    name: "McDonald's",
    symbol: "MCD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/McDonald%27s_Golden_Arches.svg",
    tvSymbol: "NYSE:MCD",
  },
  {
    name: "Johnson & Johnson",
    symbol: "JNJ",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/20/Johnson_and_Johnson_logo.svg",
    tvSymbol: "NYSE:JNJ",
  },
  {
    name: "Procter & Gamble",
    symbol: "PG",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg",
    tvSymbol: "NYSE:PG",
  },
  {
    name: "Home Depot",
    symbol: "HD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/TheHomeDepot.svg",
    tvSymbol: "NYSE:HD",
  },
  {
    name: "Cisco",
    symbol: "CSCO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg",
    tvSymbol: "NASDAQ:CSCO",
  },
];

const cac40Companies: Company[] = [
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

const companyProfiles: Record<string, CompanyProfile> = {
  AAPL: {
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
  },

  TSLA: {
    name: "Tesla",
    symbol: "TSLA",
    logo: "https://img.icons8.com/win10/1200/tesla-logo.jpg",
    exchange: "NASDAQ",
    sector: "Automobile électrique & Énergie",
    description:
      "Tesla conçoit des véhicules électriques, des systèmes de stockage d’énergie et des solutions logicielles liées à la conduite assistée, avec une valorisation très sensible aux volumes de livraisons, aux marges automobiles et aux perspectives de croissance de ses activités énergie et logiciels.",
    news: [
      {
        title: "Tesla reste très suivie sur les livraisons et les marges",
        summary:
          "Les investisseurs surveillent la demande automobile, l’évolution des prix de vente, les volumes livrés et la capacité du groupe à préserver sa rentabilité.",
        date: "Juillet 2026",
      },
      {
        title: "L’énergie et les nouveaux relais de croissance restent observés",
        summary:
          "Le marché regarde de près la progression du stockage d’énergie, des services logiciels et des futurs lancements produits.",
        date: "Juillet 2026",
      },
      {
        title: "Le dossier reste polarisé entre croissance et exécution",
        summary:
          "Les analystes continuent d’évaluer la soutenabilité de la croissance, les dépenses d’investissement et la trajectoire bénéficiaire à moyen terme.",
        date: "Juin 2026",
      },
    ],
    financials: {
      revenue: "22.4B$",
      netIncome: "0.5B$",
      cash: "37B$",
      debt: "8B$",
      freeCashFlow: "1.4B$",
    },
    estimates: {
      epsEstimate: "0.37",
      revenueEstimate: "22.6B$",
      lastQuarterSurprise: "+10.8%",
      analystView:
        "Consensus partagé, avec une attention forte portée aux livraisons, aux marges automobiles, au rythme d’investissement et aux relais de croissance hors automobile.",
    },
    sources: [
      {
        category: "Relations investisseurs",
        title: "Tesla Investor Relations",
        description:
          "Page principale pour accéder aux publications officielles, résultats, webcasts et ressources investisseurs de Tesla.",
        url: "https://ir.tesla.com/",
      },
      {
        category: "Résultats trimestriels",
        title: "Tesla Q1 2026 Update",
        description:
          "Document officiel utile pour les revenus, la profitabilité, le cash-flow, l’activité automobile et les commentaires de management.",
        url: "https://assets-ir.tesla.com/tesla-contents/IR/TSLA-Q1-2026-Update.pdf",
      },
      {
        category: "Communiqués officiels",
        title: "Tesla Press Releases",
        description:
          "Hub officiel qui regroupe les consensus, publications de livraisons et annonces liées aux résultats trimestriels.",
        url: "https://ir.tesla.com/press",
      },
      {
        category: "Consensus analystes",
        title: "Yahoo Finance – Tesla analysis",
        description:
          "Source pratique pour suivre les estimations de marché, le consensus analystes et les attentes sur les prochains trimestres.",
        url: "https://finance.yahoo.com/quote/TSLA/analysis/",
      },
      {
        category: "Consensus officiel",
        title: "Tesla Q1 2026 Earnings Consensus",
        description:
          "Page officielle de Tesla regroupant le consensus compilé avant la publication des résultats du trimestre.",
        url: "https://ir.tesla.com/press-release/earnings-consensus-first-quarter-2026",
      },
    ],
  },

  NVDA: {
    name: "NVIDIA",
    symbol: "NVDA",
    logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/4/47/Nvidia_%28logo%29.svg/1280px-Nvidia_%28logo%29.svg.png",
    exchange: "NASDAQ",
    sector: "Semi-conducteurs & IA",
    description:
      "NVIDIA conçoit des processeurs graphiques et des plateformes de calcul accéléré au cœur des infrastructures d’intelligence artificielle, des data centers, du gaming et de nombreux usages industriels avancés.",
    news: [
      {
        title: "NVIDIA reste au centre du thème IA",
        summary:
          "Les investisseurs surveillent la demande en puces pour l’intelligence artificielle, la capacité de production et la poursuite de la croissance des data centers.",
        date: "Juillet 2026",
      },
      {
        title: "Le marché suit la solidité des marges et de l’exécution",
        summary:
          "La capacité de NVIDIA à transformer une demande élevée en résultats durables reste un élément central de la thèse d’investissement.",
        date: "Juillet 2026",
      },
      {
        title: "Les perspectives de l’écosystème IA soutiennent l’intérêt du dossier",
        summary:
          "Les analystes regardent de près la profondeur du carnet de demande, les nouveaux produits et l’adoption continue des infrastructures accélérées.",
        date: "Juin 2026",
      },
    ],
    financials: {
      revenue: "130B$",
      netIncome: "73B$",
      cash: "47B$",
      debt: "11B$",
      freeCashFlow: "64B$",
    },
    estimates: {
      epsEstimate: "0.92",
      revenueEstimate: "32.8B$",
      lastQuarterSurprise: "+8.6%",
      analystView:
        "Consensus très favorable, avec un focus majeur sur la demande IA, le rythme d’innovation, la capacité d’approvisionnement et la soutenabilité de la croissance.",
    },
    sources: [
      {
        category: "Documents financiers",
        title: "NVIDIA Financial Reports",
        description:
          "Page officielle regroupant les résultats financiers publiés, utile pour accéder rapidement aux communiqués de résultats de NVIDIA.",
        url: "https://investor.nvidia.com/financial-info/financial-reports/default.aspx",
      },
      {
        category: "Résultats trimestriels",
        title: "NVIDIA Quarterly Results",
        description:
          "Hub officiel des résultats trimestriels, pratique pour retrouver les publications et supports investisseurs.",
        url: "https://investor.nvidia.com/financial-info/quarterly-results/default.aspx",
      },
      {
        category: "Documents réglementaires",
        title: "NVIDIA SEC Filings",
        description:
          "Page officielle des dépôts réglementaires, utile pour vérifier les publications financières et documents adressés au marché.",
        url: "https://investor.nvidia.com/financial-info/sec-filings/default.aspx",
      },
      {
        category: "Résultats trimestriels",
        title: "NVIDIA Announces Financial Results for First Quarter Fiscal 2027",
        description:
          "Communiqué officiel de résultats, utile pour les revenus, la profitabilité, le Data Center et la dynamique des activités IA.",
        url: "https://investor.nvidia.com/financial-info/financial-reports/default.aspx",
      },
      {
        category: "Consensus analystes",
        title: "Yahoo Finance – Nvidia tops Q1 earnings and revenue estimates",
        description:
          "Source pratique pour suivre la surprise de résultats, le consensus marché et les attentes sur le trimestre suivant.",
        url: "https://finance.yahoo.com/markets/stocks/articles/nvidia-nvda-tops-q1-earnings-213501976.html",
      },
    ],
  },

  NFLX: {
    name: "Netflix",
    symbol: "NFLX",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/Netflix_2016_N_logo.svg",
    exchange: "NASDAQ",
    sector: "Streaming & Divertissement",
    description:
      "Netflix est un acteur majeur du streaming vidéo mondial, avec une activité centrée sur les abonnements, la croissance des revenus par utilisateur, le contenu original et l’amélioration continue de sa rentabilité.",
    news: [
      {
        title: "Netflix reste suivie sur la croissance des abonnés et des revenus",
        summary:
          "Les investisseurs surveillent l’évolution de la base d’abonnés, la capacité de monétisation et la progression des revenus par utilisateur.",
        date: "Juillet 2026",
      },
      {
        title: "La publicité et les nouvelles offres restent au cœur des attentes",
        summary:
          "Le marché observe la montée en puissance des offres avec publicité et leur impact potentiel sur la croissance et les marges.",
        date: "Juillet 2026",
      },
      {
        title: "Le contenu et la discipline de coûts soutiennent la thèse",
        summary:
          "Les analystes continuent d’évaluer l’équilibre entre investissement dans les contenus, engagement des utilisateurs et génération de cash-flow.",
        date: "Juin 2026",
      },
    ],
    financials: {
      revenue: "39B$",
      netIncome: "8B$",
      cash: "8B$",
      debt: "15B$",
      freeCashFlow: "7B$",
    },
    estimates: {
      epsEstimate: "4.65",
      revenueEstimate: "10.9B$",
      lastQuarterSurprise: "+4.7%",
      analystView:
        "Consensus favorable, avec une attention particulière portée à la croissance des revenus, à la publicité, à la marge opérationnelle et à la dynamique d’abonnements.",
    },
    sources: [
      {
        category: "Résultats trimestriels",
        title: "Netflix Quarterly Earnings",
        description:
          "Hub officiel pour accéder aux publications trimestrielles, lettres aux actionnaires et principaux documents financiers de Netflix.",
        url: "https://ir.netflix.net/financials/quarterly-earnings/default.aspx",
      },
      {
        category: "Documents réglementaires",
        title: "Netflix SEC Filings",
        description:
          "Page officielle regroupant les dépôts réglementaires de Netflix, utile pour vérifier les informations financières publiées.",
        url: "https://ir.netflix.net/financials/sec-filings/default.aspx",
      },
      {
        category: "Documents financiers",
        title: "Netflix Annual Reports & Proxies",
        description:
          "Accès aux rapports annuels et documents de gouvernance, utile pour compléter la lecture long terme du dossier.",
        url: "https://ir.netflix.net/financials/annual-reports-and-proxies/default.aspx",
      },
      {
        category: "Consensus analystes",
        title: "Nasdaq – Netflix earnings",
        description:
          "Source pratique pour suivre les attentes de marché sur l’EPS, la date de publication et les prévisions trimestrielles.",
        url: "https://www.nasdaq.com/market-activity/stocks/nflx/earnings",
      },
      {
        category: "Lecture marché",
        title: "Netflix Q1 2026 earnings & revenues top estimates",
        description:
          "Source utile pour compléter la lecture marché sur la surprise de résultats, les revenus, la marge opérationnelle et le free cash flow.",
        url: "https://finance.yahoo.com/markets/stocks/articles/netflix-q1-earnings-revenues-top-152400638.html",
      },
    ],
  },

  DELL: {
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
        title: "Dell Q1 fiscal 2027 earnings release",
        description:
          "Document utile pour les revenus, EPS, cash flow opérationnel et commentaires de management sur la dynamique IA et serveurs.",
        url: "https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~05~dell-technologies-delivers-first-quarter-fiscal-2027-financial-results.htm",
      },
      {
        category: "Résultats annuels",
        title: "Dell Technologies Delivers Fourth Quarter and Full-Year Fiscal 2026 Results",
        description:
          "Publication officielle utile pour les chiffres annuels, la trajectoire de revenus et les principaux éléments financiers de l’exercice.",
        url: "https://www.dell.com/en-us/dt/corporate/newsroom/announcements/detailpage.press-releases~usa~2026~2~dell-technologies-delivers-fourth-quarter-and-full-year-fiscal-2026-results.htm",
      },
      {
        category: "Consensus analystes",
        title: "Yahoo Finance / Zacks – Dell Q1 earnings beat estimates",
        description:
          "Source pratique pour suivre la surprise de résultats, les attentes du consensus et la lecture marché autour de Dell.",
        url: "https://finance.yahoo.com/markets/stocks/articles/dell-q1-earnings-beat-estimates-161900954.html",
      },
    ],
  },

  MU: {
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
  },
};

export default function GraphiqueClient() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Company>(companies[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<
    "news" | "financials" | "estimates" | "sources"
  >("news");

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return allCompanies;

    return allCompanies.filter((company) => {
      return (
        company.name.toLowerCase().includes(normalizedSearch) ||
        company.symbol.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchTerm]);

  const selectedProfile = companyProfiles[selected.symbol];

  const tabs = [
    { id: "news", label: "Actualités" },
    { id: "financials", label: "Bilans" },
    { id: "estimates", label: "Estimations" },
    { id: "sources", label: "Sources" },
  ] as const;

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

      <section className="relative mx-auto max-w-6xl">
        <h1 className="text-center text-5xl font-bold text-yellow-400">
          Graphique & Synthèse
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-gray-300">
          Sélectionnez une entreprise pour afficher son graphique en direct, puis
          consulter sa synthèse, ses bilans, ses actualités et les attentes du marché.
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
            Accédez à un portefeuille virtuel pour vous entraîner à la bourse,
            suivre vos positions et tester vos décisions sans risque réel.
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
              {selected.logo ? (
                <img
                  src={selected.logo}
                  alt={selected.name}
                  className="h-8 w-8 rounded-full bg-white object-contain p-1"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/10 text-xs font-bold text-yellow-300">
                  {selected.symbol.slice(0, 2)}
                </div>
              )}

              <span>
                {selected.name} <span className="text-gray-400">({selected.symbol})</span>
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
                      setActiveTab("news");
                    }}
                    className="flex w-full items-center gap-3 border-b border-white/5 px-5 py-4 text-left transition hover:bg-white/5 last:border-b-0"
                  >
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-8 w-8 rounded-full bg-white object-contain p-1"
                      />
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400/10 text-xs font-bold text-yellow-300">
                        {company.symbol.slice(0, 2)}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="truncate font-medium text-white">{company.name}</p>
                      <p className="text-sm text-gray-400">{company.symbol}</p>
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

        <div className="mt-12 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 p-4 shadow-2xl">
          <div className="mb-4 flex items-center gap-3">
            {selected.logo ? (
              <img
                src={selected.logo}
                alt={selected.name}
                className="h-10 w-10 rounded-full bg-white object-contain p-1"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10 text-sm font-bold text-yellow-300">
                {selected.symbol.slice(0, 2)}
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-yellow-400">{selected.name}</h2>
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
            </span>
            .
          </p>
        </div>

        {selectedProfile ? (
          <>
            <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedProfile.logo}
                    alt={selectedProfile.name}
                    className="h-16 w-16 rounded-full bg-white object-contain p-2"
                  />
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                      Synthèse entreprise
                    </p>
                    <h2 className="mt-1 text-4xl font-bold text-yellow-400 md:text-5xl">
                      {selectedProfile.name}
                    </h2>
                    <p className="mt-2 text-gray-400">
                      {selectedProfile.exchange} • {selectedProfile.symbol} •{" "}
                      {selectedProfile.sector}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 px-5 py-4 text-sm text-gray-300">
                  Actualités, bilans, estimations et sources principales.
                </div>
              </div>

              <p className="mt-8 max-w-4xl text-lg leading-8 text-gray-300">
                {selectedProfile.description}
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
                  <h3 className="text-2xl font-semibold text-yellow-400">Actualités</h3>
                  <div className="mt-6 grid gap-4">
                    {selectedProfile.news.map((item, index) => (
                      <article
                        key={index}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <h4 className="text-lg font-semibold text-white">{item.title}</h4>
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
                  <h3 className="text-2xl font-semibold text-yellow-400">
                    Bilans financiers
                  </h3>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-gray-400">Chiffre d’affaires</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.financials.revenue}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-gray-400">Résultat net</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.financials.netIncome}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-gray-400">Trésorerie</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.financials.cash}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-gray-400">Dette</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.financials.debt}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                      <p className="text-sm text-gray-400">Free Cash Flow</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.financials.freeCashFlow}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "estimates" && (
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-400">Estimations</h3>
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-gray-400">EPS estimé</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.estimates.epsEstimate}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm text-gray-400">Chiffre d’affaires estimé</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.estimates.revenueEstimate}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                      <p className="text-sm text-gray-400">Point de lecture récent</p>
                      <p className="mt-2 text-3xl font-bold text-white">
                        {selectedProfile.estimates.lastQuarterSurprise}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:col-span-2">
                      <p className="text-sm text-gray-400">Lecture du consensus</p>
                      <p className="mt-2 text-lg text-gray-300">
                        {selectedProfile.estimates.analystView}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "sources" && (
                <div>
                  <h3 className="text-2xl font-semibold text-yellow-400">Sources</h3>
                  <p className="mt-3 max-w-3xl text-gray-300">
                    Cette section regroupe les liens principaux pour documenter
                    les chiffres, le consensus et les éléments de suivi de
                    l’entreprise sélectionnée.
                  </p>

                  <div className="mt-6 grid gap-4">
                    {selectedProfile.sources.map((source, index) => (
                      <article
                        key={index}
                        className="rounded-2xl border border-white/10 bg-white/5 p-5"
                      >
                        <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70">
                          {source.category}
                        </p>
                        <h4 className="mt-2 text-lg font-semibold text-white">
                          {source.title}
                        </h4>
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
          </>
        ) : (
          <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
            <p className="text-sm uppercase tracking-[0.2em] text-yellow-400/70">
              Synthèse à venir
            </p>
            <h2 className="mt-3 text-3xl font-bold text-yellow-400">
              {selected.name}
            </h2>
            <p className="mt-4 max-w-3xl text-gray-300">
              La fiche synthèse détaillée de cette entreprise n’est pas encore
              remplie. Tu peux déjà afficher son graphique ci-dessus, puis ajouter
              plus tard ses actualités, bilans, estimations et sources dans
              l’objet <code className="rounded bg-white/10 px-2 py-1">companyProfiles</code>.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}