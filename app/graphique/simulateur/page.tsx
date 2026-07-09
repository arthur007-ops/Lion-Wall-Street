"use client";

import { useMemo, useState } from "react";

type Position = {
  symbol: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
};

type Transaction = {
  id: string;
  symbol: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  date: string;
};

const availableStocks = [
  { name: "Apple", symbol: "AAPL" },
  { name: "Microsoft", symbol: "MSFT" },
  { name: "Amazon", symbol: "AMZN" },
  { name: "Alphabet (Google)", symbol: "GOOGL" },
  { name: "Meta Platforms", symbol: "META" },
  { name: "Tesla", symbol: "TSLA" },
  { name: "NVIDIA", symbol: "NVDA" },
  { name: "Netflix", symbol: "NFLX" },
  { name: "Intel", symbol: "INTC" },
  { name: "Micron Technology", symbol: "MU" },
];

export default function SimulateurPage() {
  const initialCash = 10000;

  const [cash, setCash] = useState(initialCash);
  const [positions, setPositions] = useState<Position[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const [loadingPrice, setLoadingPrice] = useState(false);
  const [priceError, setPriceError] = useState("");

  const [stocksOpen, setStocksOpen] = useState(false);

  const portfolioValue = useMemo(() => {
    return positions.reduce((total, item) => {
      return total + item.quantity * item.currentPrice;
    }, 0);
  }, [positions]);

  const investedValue = useMemo(() => {
    return positions.reduce((total, item) => {
      return total + item.quantity * item.averagePrice;
    }, 0);
  }, [positions]);

  const pnl = portfolioValue - investedValue;

  const filteredStocks = useMemo(() => {
    const term = symbol.trim().toLowerCase();

    if (!term) return availableStocks;

    return availableStocks.filter(
      (stock) =>
        stock.name.toLowerCase().includes(term) ||
        stock.symbol.toLowerCase().includes(term)
    );
  }, [symbol]);

  const fetchLivePriceForSymbol = async (inputSymbol: string) => {
    const normalizedSymbol = inputSymbol.trim().toUpperCase();

    if (!normalizedSymbol) {
      setPrice("");
      setPriceError("Veuillez entrer un symbole.");
      return;
    }

    try {
      setLoadingPrice(true);
      setPriceError("");

      const response = await fetch(
        `/api/quote?symbol=${encodeURIComponent(normalizedSymbol)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Impossible de récupérer le prix."
        );
      }

      if (typeof data?.price !== "number" || Number.isNaN(data.price)) {
        throw new Error("Le prix reçu est invalide.");
      }

      setSymbol(normalizedSymbol);
      setPrice(data.price.toFixed(2));
      setPriceError("");
    } catch (error) {
      setPrice("");
      setPriceError(
        error instanceof Error
          ? error.message
          : "Impossible de récupérer le prix actuel pour ce symbole."
      );
    } finally {
      setLoadingPrice(false);
    }
  };

  const fetchLivePrice = async () => {
    await fetchLivePriceForSymbol(symbol);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedSymbol = symbol.trim().toUpperCase();
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    if (!normalizedSymbol || parsedQuantity <= 0 || parsedPrice <= 0) {
      setPriceError("Veuillez remplir correctement le symbole, la quantité et le prix.");
      return;
    }

    if (orderType === "buy") {
      const totalCost = parsedQuantity * parsedPrice;

      if (totalCost > cash) {
        setPriceError("Fonds insuffisants pour cet achat.");
        return;
      }

      setCash((prev) => prev - totalCost);

      setPositions((prev) => {
        const existing = prev.find((item) => item.symbol === normalizedSymbol);

        if (!existing) {
          return [
            ...prev,
            {
              symbol: normalizedSymbol,
              quantity: parsedQuantity,
              averagePrice: parsedPrice,
              currentPrice: parsedPrice,
            },
          ];
        }

        const newQuantity = existing.quantity + parsedQuantity;
        const newAveragePrice =
          (existing.quantity * existing.averagePrice + parsedQuantity * parsedPrice) /
          newQuantity;

        return prev.map((item) =>
          item.symbol === normalizedSymbol
            ? {
                ...item,
                quantity: newQuantity,
                averagePrice: newAveragePrice,
                currentPrice: parsedPrice,
              }
            : item
        );
      });
    }

    if (orderType === "sell") {
      const existing = positions.find((item) => item.symbol === normalizedSymbol);

      if (!existing || parsedQuantity > existing.quantity) {
        setPriceError("Quantité insuffisante pour cette vente.");
        return;
      }

      const totalValue = parsedQuantity * parsedPrice;

      setCash((prev) => prev + totalValue);

      setPositions((prev) =>
        prev
          .map((item) =>
            item.symbol === normalizedSymbol
              ? {
                  ...item,
                  quantity: item.quantity - parsedQuantity,
                  currentPrice: parsedPrice,
                }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
    }

    setTransactions((prev) => [
      {
        id: crypto.randomUUID(),
        symbol: normalizedSymbol,
        type: orderType,
        quantity: parsedQuantity,
        price: parsedPrice,
        date: new Date().toLocaleString("fr-FR"),
      },
      ...prev,
    ]);

    setSymbol("");
    setQuantity("");
    setPrice("");
    setOrderType("buy");
    setPriceError("");
    setStocksOpen(false);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/70">
            Graphique / Simulateur
          </p>
          <h1 className="mt-3 text-4xl font-bold text-yellow-400 md:text-5xl">
            Portefeuille virtuel
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300">
            Commencez avec un capital virtuel, puis ajoutez vos propres ordres pour vous entraîner.
          </p>
        </div>

        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Cash disponible</p>
            <p className="mt-2 text-2xl font-semibold text-yellow-300">
              {cash.toFixed(2)} €
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Valeur investie</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {investedValue.toFixed(2)} €
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">Valeur portefeuille</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {portfolioValue.toFixed(2)} €
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-gray-400">P&L total</p>
            <p
              className={`mt-2 text-2xl font-semibold ${
                pnl >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {pnl >= 0 ? "+" : ""}
              {pnl.toFixed(2)} €
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-yellow-400">
              Passer un ordre
            </h2>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="relative">
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={symbol}
                      onChange={(e) => {
                        setSymbol(e.target.value.toUpperCase());
                        setPriceError("");
                        setStocksOpen(true);
                      }}
                      onFocus={() => setStocksOpen(true)}
                      placeholder="Symbole (ex: AAPL)"
                      className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400/40"
                    />

                    <button
                      type="button"
                      onClick={() => setStocksOpen((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400 transition"
                      aria-label="Afficher la liste des actions"
                    >
                      <span
                        className={`block transition-transform duration-300 ${
                          stocksOpen ? "rotate-180" : "rotate-0"
                        }`}
                      >
                        ⌄
                      </span>
                    </button>

                    <div
                      className={`absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 origin-top rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl transition-all duration-300 ease-out ${
                        stocksOpen
                          ? "visible max-h-[320px] translate-y-0 scale-100 opacity-100"
                          : "invisible max-h-0 -translate-y-2 scale-95 opacity-0"
                      }`}
                    >
                      <div className="max-h-[320px] overflow-y-auto overscroll-contain">
                        {filteredStocks.length > 0 ? (
                          filteredStocks.map((stock) => (
                            <button
                              key={stock.symbol}
                              type="button"
                              onClick={() => {
                                setSymbol(stock.symbol);
                                setStocksOpen(false);
                                fetchLivePriceForSymbol(stock.symbol);
                              }}
                              className="flex w-full items-center justify-between border-b border-white/5 px-4 py-3 text-left text-sm transition hover:bg-white/5 last:border-b-0"
                            >
                              <span className="flex min-w-0 flex-col">
                                <span className="truncate font-medium text-white">
                                  {stock.name}
                                </span>
                                <span className="text-xs text-gray-400">
                                  {stock.symbol}
                                </span>
                              </span>

                              <span className="ml-4 shrink-0 text-xs text-yellow-300">
                                Sélectionner
                              </span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-4 text-sm text-gray-400">
                            Aucune action trouvée.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={fetchLivePrice}
                    disabled={loadingPrice}
                    className="shrink-0 rounded-xl bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingPrice ? "Chargement..." : "Prix réel"}
                  </button>
                </div>
              </div>

              {priceError ? (
                <p className="text-sm text-red-400">{priceError}</p>
              ) : null}

              <select
                value={orderType}
                onChange={(e) => {
                  setOrderType(e.target.value as "buy" | "sell");
                  setPriceError("");
                }}
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:border-yellow-400/40"
              >
                <option value="buy">Achat</option>
                <option value="sell">Vente</option>
              </select>

              <input
                type="number"
                min="0"
                step="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantité"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400/40"
              />

              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Prix"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-yellow-400/40"
              />

              <button
                type="submit"
                className="w-full rounded-xl bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-300"
              >
                Valider l’ordre
              </button>
            </form>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold text-yellow-400">
              Positions ouvertes
            </h2>

            {positions.length === 0 ? (
              <p className="mt-5 text-sm text-gray-400">
                Aucune position pour le moment.
              </p>
            ) : (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="text-gray-400">
                    <tr>
                      <th className="pb-3">Symbole</th>
                      <th className="pb-3">Qté</th>
                      <th className="pb-3">Prix moyen</th>
                      <th className="pb-3">Prix actuel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((position) => (
                      <tr key={position.symbol} className="border-t border-white/10">
                        <td className="py-4 font-medium text:white">
                          {position.symbol}
                        </td>
                        <td className="py-4 text-gray-300">
                          {position.quantity}
                        </td>
                        <td className="py-4 text-gray-300">
                          {position.averagePrice.toFixed(2)} €
                        </td>
                        <td className="py-4 text-gray-300">
                          {position.currentPrice.toFixed(2)} €
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-white/10 bg:white/5 p-6">
          <h2 className="text-xl font-semibold text-yellow-400">
            Historique
          </h2>

          {transactions.length === 0 ? (
            <p className="mt-5 text-sm text-gray-400">
              Aucune transaction enregistrée pour le moment.
            </p>
          ) : (
            <div className="mt-5 flex flex-col gap-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="rounded-xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="font-medium text-white">
                    {transaction.type === "buy" ? "Achat" : "Vente"}{" "}
                    {transaction.symbol}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    {transaction.quantity} actions à{" "}
                    {transaction.price.toFixed(2)} € · {transaction.date}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}