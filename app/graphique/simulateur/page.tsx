"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Position = {
  id?: string;
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

type PortfolioHistoryPoint = {
  id: string;
  totalValue: number;
  cash: number;
  investedValue: number;
  pnl: number;
  createdAt: string;
  label: string;
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

function PremiumTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;

  const value = Number(payload[0]?.value ?? 0);

  return (
    <div className="rounded-2xl border border-white/10 bg-black/90 px-4 py-3 shadow-2xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70">
        Point
      </p>
      <p className="mt-1 text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">
        {value.toFixed(2)} €
      </p>
      <p className="mt-1 text-xs text-gray-500">Valeur live du portefeuille</p>
    </div>
  );
}

export default function SimulateurPage() {
  const initialCash = 10000;
  const DAILY_REQUEST_LIMIT = 25;
  const MIN_REFRESH_INTERVAL_MS = Math.ceil(
    (24 * 60 * 60 * 1000) / DAILY_REQUEST_LIMIT
  );

  const [userId, setUserId] = useState("");
  const [authChecked, setAuthChecked] = useState(false);
  const [pageError, setPageError] = useState("");

  const [cash, setCash] = useState(initialCash);
  const [positions, setPositions] = useState<Position[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [history, setHistory] = useState<PortfolioHistoryPoint[]>([]);

  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");

  const [loadingPrice, setLoadingPrice] = useState(false);
  const [priceError, setPriceError] = useState("");
  const [savingOrder, setSavingOrder] = useState(false);
  const [resettingPortfolio, setResettingPortfolio] = useState(false);
  const [refreshingMarket, setRefreshingMarket] = useState(false);

  const [stocksOpen, setStocksOpen] = useState(false);

  const latestPositionsRef = useRef<Position[]>([]);
  const latestCashRef = useRef(initialCash);
  const refreshingMarketRef = useRef(false);
  const nextSymbolIndexRef = useRef(0);
  const lastRequestAtRef = useRef(0);

  useEffect(() => {
    latestPositionsRef.current = positions;
  }, [positions]);

  useEffect(() => {
    latestCashRef.current = cash;
  }, [cash]);

  useEffect(() => {
    refreshingMarketRef.current = refreshingMarket;
  }, [refreshingMarket]);

  useEffect(() => {
    const loadPortfolio = async () => {
      setPageError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setPageError("Utilisateur non connecté.");
        setAuthChecked(true);
        return;
      }

      setUserId(user.id);

      const { data: portfolioRow, error: portfolioLoadError } = await supabase
        .from("paper_portfolios")
        .select("cash, initial_cash")
        .eq("user_id", user.id)
        .maybeSingle();

      if (portfolioLoadError) {
        setPageError(portfolioLoadError.message);
        setAuthChecked(true);
        return;
      }

      if (!portfolioRow) {
        const { error: createPortfolioError } = await supabase
          .from("paper_portfolios")
          .upsert({
            user_id: user.id,
            cash: initialCash,
            initial_cash: initialCash,
            updated_at: new Date().toISOString(),
          });

        if (createPortfolioError) {
          setPageError(createPortfolioError.message);
          setAuthChecked(true);
          return;
        }

        setCash(initialCash);
      } else {
        setCash(Number(portfolioRow.cash ?? initialCash));
      }

      const { data: positionRows, error: positionsError } = await supabase
        .from("paper_positions")
        .select("id, symbol, quantity, average_price, current_price")
        .eq("user_id", user.id)
        .order("symbol", { ascending: true });

      if (positionsError) {
        setPageError(positionsError.message);
        setAuthChecked(true);
        return;
      }

      const mergedPositionsMap = new Map<string, Position>();

      (positionRows || []).forEach((row) => {
        const symbol = row.symbol;
        const existing = mergedPositionsMap.get(symbol);

        if (!existing) {
          mergedPositionsMap.set(symbol, {
            id: row.id,
            symbol,
            quantity: Number(row.quantity),
            averagePrice: Number(row.average_price),
            currentPrice: Number(row.current_price),
          });
          return;
        }

        const existingTotalCost = existing.quantity * existing.averagePrice;
        const nextQuantity = existing.quantity + Number(row.quantity);
        const nextAveragePrice =
          nextQuantity > 0
            ? (existingTotalCost + Number(row.quantity) * Number(row.average_price)) /
              nextQuantity
            : 0;

        mergedPositionsMap.set(symbol, {
          id: existing.id ?? row.id,
          symbol,
          quantity: nextQuantity,
          averagePrice: nextAveragePrice,
          currentPrice: Number(row.current_price),
        });
      });

      const mappedPositions = Array.from(mergedPositionsMap.values());

      setPositions(mappedPositions);

      const { data: transactionRows, error: transactionsError } = await supabase
        .from("paper_transactions")
        .select("id, symbol, type, quantity, price, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (transactionsError) {
        setPageError(transactionsError.message);
        setAuthChecked(true);
        return;
      }

      const mappedTransactions: Transaction[] = (transactionRows || []).map((row) => ({
        id: row.id,
        symbol: row.symbol,
        type: row.type,
        quantity: Number(row.quantity),
        price: Number(row.price),
        date: new Date(row.created_at).toLocaleString("fr-FR"),
      }));

      setTransactions(mappedTransactions);

      const { data: historyRows, error: historyError } = await supabase
        .from("paper_portfolio_history")
        .select("id, total_value, cash, invested_value, pnl, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (historyError) {
        setPageError(historyError.message);
        setAuthChecked(true);
        return;
      }

      const mappedHistory: PortfolioHistoryPoint[] = (historyRows || []).map((row) => ({
        id: row.id,
        totalValue: Number(row.total_value),
        cash: Number(row.cash),
        investedValue: Number(row.invested_value),
        pnl: Number(row.pnl),
        createdAt: row.created_at,
        label: new Date(row.created_at).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));

      setHistory(mappedHistory);
      setAuthChecked(true);
    };

    loadPortfolio();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel(`portfolio-history-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "paper_portfolio_history",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const row = payload.new as {
            id: string;
            total_value: number;
            cash: number;
            invested_value: number;
            pnl: number;
            created_at: string;
          };

          setHistory((prev) => {
            const exists = prev.some((item) => item.id === row.id);
            if (exists) return prev;

            const next = [
              ...prev,
              {
                id: row.id,
                totalValue: Number(row.total_value),
                cash: Number(row.cash),
                investedValue: Number(row.invested_value),
                pnl: Number(row.pnl),
                createdAt: row.created_at,
                label: new Date(row.created_at).toLocaleTimeString("fr-FR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ];

            return next.sort(
              (a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

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

  const latestHistoryValue = useMemo(() => {
    if (history.length === 0) return portfolioValue;
    return history[history.length - 1]?.investedValue ?? portfolioValue;
  }, [history, portfolioValue]);

  const firstHistoryValue = useMemo(() => {
    if (history.length === 0) return portfolioValue;
    return history[0]?.investedValue ?? portfolioValue;
  }, [history, portfolioValue]);

  const liveDelta = latestHistoryValue - firstHistoryValue;
  const liveDeltaPercent =
    firstHistoryValue > 0 ? (liveDelta / firstHistoryValue) * 100 : 0;

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

  const refreshPositionsLivePrices = async () => {
    const currentPositions = latestPositionsRef.current;
    const currentCash = latestCashRef.current;

    if (!userId || currentPositions.length === 0 || refreshingMarketRef.current) return;

    const now = Date.now();
    const elapsed = now - lastRequestAtRef.current;

    if (elapsed < MIN_REFRESH_INTERVAL_MS) {
      return;
    }

    const uniqueSymbols = Array.from(
      new Set(
        currentPositions
          .map((position) => position.symbol.trim().toUpperCase())
          .filter(Boolean)
      )
    );

    if (uniqueSymbols.length === 0) return;

    const symbolIndex = nextSymbolIndexRef.current % uniqueSymbols.length;
    const symbolToRefresh = uniqueSymbols[symbolIndex];

    try {
      setRefreshingMarket(true);
      refreshingMarketRef.current = true;

      const response = await fetch(
        `/api/quote?symbol=${encodeURIComponent(symbolToRefresh)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || typeof data?.price !== "number" || Number.isNaN(data.price)) {
        return;
      }

      const updatedPrice = Number(data.price);
      const updatedAt = new Date().toISOString();

      const refreshedPositions = currentPositions.map((position) =>
        position.symbol.trim().toUpperCase() === symbolToRefresh
          ? { ...position, currentPrice: updatedPrice }
          : position
      );

      setPositions(refreshedPositions);
      lastRequestAtRef.current = now;
      nextSymbolIndexRef.current = (symbolIndex + 1) % uniqueSymbols.length;

      const rows = refreshedPositions.map((item) => ({
        user_id: userId,
        symbol: item.symbol,
        quantity: item.quantity,
        average_price: item.averagePrice,
        current_price: item.currentPrice,
        updated_at: updatedAt,
      }));

      const { error: positionsUpsertError } = await supabase
        .from("paper_positions")
        .upsert(rows, { onConflict: "user_id,symbol" });

      if (positionsUpsertError) {
        console.error("Erreur mise à jour paper_positions:", positionsUpsertError.message);
      }

      const refreshedPortfolioValue = refreshedPositions.reduce(
        (total, item) => total + item.quantity * item.currentPrice,
        0
      );

      const refreshedInvestedValue = refreshedPositions.reduce(
        (total, item) => total + item.quantity * item.averagePrice,
        0
      );

      const refreshedPnl = refreshedPortfolioValue - refreshedInvestedValue;
      const refreshedTotalValue = currentCash + refreshedPortfolioValue;

      const { error: historyError } = await supabase
        .from("paper_portfolio_history")
        .insert({
          user_id: userId,
          total_value: refreshedTotalValue,
          cash: currentCash,
          invested_value: refreshedPortfolioValue,
          pnl: refreshedPnl,
          created_at: updatedAt,
        });

      if (historyError) {
        console.error("Erreur insertion historique live:", historyError.message);
      }
    } catch (error) {
      console.error("Erreur refresh live:", error);
    } finally {
      setRefreshingMarket(false);
      refreshingMarketRef.current = false;
    }
  };

  useEffect(() => {
    if (!userId || positions.length === 0) return;

    const intervalId = window.setInterval(() => {
      refreshPositionsLivePrices();
    }, 60 * 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [userId, positions.length]);

  const handleResetPortfolio = async () => {
    if (!userId) {
      setPageError("Utilisateur non connecté.");
      return;
    }

    const confirmed = window.confirm(
      "Voulez-vous vraiment réinitialiser le portefeuille ? Cette action remettra le cash à 10 000 € et supprimera toutes les positions."
    );

    if (!confirmed) return;

    try {
      setResettingPortfolio(true);
      setPageError("");
      setPriceError("");

      const resetDate = new Date().toISOString();

      const { error: portfolioError } = await supabase
        .from("paper_portfolios")
        .upsert({
          user_id: userId,
          cash: initialCash,
          initial_cash: initialCash,
          updated_at: resetDate,
        });

      if (portfolioError) {
        setPageError(portfolioError.message);
        return;
      }

      const { error: positionsError } = await supabase
        .from("paper_positions")
        .delete()
        .eq("user_id", userId);

      if (positionsError) {
        setPageError(positionsError.message);
        return;
      }

      const { error: transactionsError } = await supabase
        .from("paper_transactions")
        .delete()
        .eq("user_id", userId);

      if (transactionsError) {
        setPageError(transactionsError.message);
        return;
      }

      const { error: historyDeleteError } = await supabase
        .from("paper_portfolio_history")
        .delete()
        .eq("user_id", userId);

      if (historyDeleteError) {
        setPageError(historyDeleteError.message);
        return;
      }

      const { data: historyRow, error: historyInsertError } = await supabase
        .from("paper_portfolio_history")
        .insert({
          user_id: userId,
          total_value: initialCash,
          cash: initialCash,
          invested_value: 0,
          pnl: 0,
          created_at: resetDate,
        })
        .select()
        .single();

      if (historyInsertError) {
        setPageError(historyInsertError.message);
        return;
      }

      setCash(initialCash);
      setPositions([]);
      setTransactions([]);
      setHistory([
        {
          id: historyRow.id,
          totalValue: Number(historyRow.total_value),
          cash: Number(historyRow.cash),
          investedValue: Number(historyRow.invested_value),
          pnl: Number(historyRow.pnl),
          createdAt: historyRow.created_at,
          label: new Date(historyRow.created_at).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setSymbol("");
      setQuantity("");
      setPrice("");
      setOrderType("buy");
      setStocksOpen(false);
      nextSymbolIndexRef.current = 0;
      lastRequestAtRef.current = 0;
    } catch (error) {
      setPageError(
        error instanceof Error
          ? error.message
          : "Impossible de réinitialiser le portefeuille."
      );
    } finally {
      setResettingPortfolio(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setPriceError("Utilisateur non connecté.");
      return;
    }

    const normalizedSymbol = symbol.trim().toUpperCase();
    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);

    if (!normalizedSymbol || parsedQuantity <= 0 || parsedPrice <= 0) {
      setPriceError("Veuillez remplir correctement le symbole, la quantité et le prix.");
      return;
    }

    try {
      setSavingOrder(true);
      setPriceError("");

      let nextCash = cash;
      let nextPositions = [...positions];

      if (orderType === "buy") {
        const totalCost = parsedQuantity * parsedPrice;

        if (totalCost > cash) {
          setPriceError("Fonds insuffisants pour cet achat.");
          return;
        }

        nextCash = cash - totalCost;
        const existing = nextPositions.find((item) => item.symbol === normalizedSymbol);

        if (!existing) {
          nextPositions = [
            ...nextPositions,
            {
              symbol: normalizedSymbol,
              quantity: parsedQuantity,
              averagePrice: parsedPrice,
              currentPrice: parsedPrice,
            },
          ];
        } else {
          const newQuantity = existing.quantity + parsedQuantity;
          const newAveragePrice =
            (existing.quantity * existing.averagePrice + parsedQuantity * parsedPrice) /
            newQuantity;

          nextPositions = nextPositions.map((item) =>
            item.symbol === normalizedSymbol
              ? {
                  ...item,
                  quantity: newQuantity,
                  averagePrice: newAveragePrice,
                  currentPrice: parsedPrice,
                }
              : item
          );
        }
      }

      if (orderType === "sell") {
        const existing = nextPositions.find((item) => item.symbol === normalizedSymbol);

        if (!existing || parsedQuantity > existing.quantity) {
          setPriceError("Quantité insuffisante pour cette vente.");
          return;
        }

        const totalValue = parsedQuantity * parsedPrice;
        nextCash = cash + totalValue;

        nextPositions = nextPositions
          .map((item) =>
            item.symbol === normalizedSymbol
              ? {
                  ...item,
                  quantity: item.quantity - parsedQuantity,
                  currentPrice: parsedPrice,
                }
              : item
          )
          .filter((item) => item.quantity > 0);
      }

      const { error: portfolioError } = await supabase.from("paper_portfolios").upsert({
        user_id: userId,
        cash: nextCash,
        initial_cash: initialCash,
        updated_at: new Date().toISOString(),
      });

      if (portfolioError) {
        setPriceError(portfolioError.message);
        return;
      }

      const { error: deletePositionsError } = await supabase
        .from("paper_positions")
        .delete()
        .eq("user_id", userId);

      if (deletePositionsError) {
        setPriceError(deletePositionsError.message);
        return;
      }

      if (nextPositions.length > 0) {
        const rows = nextPositions.map((item) => ({
          user_id: userId,
          symbol: item.symbol,
          quantity: item.quantity,
          average_price: item.averagePrice,
          current_price: item.currentPrice,
          updated_at: new Date().toISOString(),
        }));

        const { error: insertPositionsError } = await supabase
          .from("paper_positions")
          .upsert(rows, { onConflict: "user_id,symbol" });

        if (insertPositionsError) {
          setPriceError(insertPositionsError.message);
          return;
        }
      }

      const txDate = new Date();

      const { data: insertedTransaction, error: txError } = await supabase
        .from("paper_transactions")
        .insert({
          user_id: userId,
          symbol: normalizedSymbol,
          type: orderType,
          quantity: parsedQuantity,
          price: parsedPrice,
          created_at: txDate.toISOString(),
        })
        .select()
        .single();

      if (txError) {
        setPriceError(txError.message);
        return;
      }

      const nextPortfolioValue = nextPositions.reduce(
        (total, item) => total + item.quantity * item.currentPrice,
        0
      );

      const nextPnl = nextPortfolioValue - nextPositions.reduce(
        (total, item) => total + item.quantity * item.averagePrice,
        0
      );

      const nextTotalValue = nextCash + nextPortfolioValue;

      const { error: historyError } = await supabase
        .from("paper_portfolio_history")
        .insert({
          user_id: userId,
          total_value: nextTotalValue,
          cash: nextCash,
          invested_value: nextPortfolioValue,
          pnl: nextPnl,
          created_at: txDate.toISOString(),
        });

      if (historyError) {
        setPriceError(historyError.message);
        return;
      }

      setCash(nextCash);
      setPositions(nextPositions);
      setTransactions((prev) => [
        {
          id: insertedTransaction.id,
          symbol: normalizedSymbol,
          type: orderType,
          quantity: parsedQuantity,
          price: parsedPrice,
          date: txDate.toLocaleString("fr-FR"),
        },
        ...prev,
      ]);

      setSymbol("");
      setQuantity("");
      setPrice("");
      setOrderType("buy");
      setStocksOpen(false);

      const uniqueSymbols = Array.from(
        new Set(
          nextPositions.map((position) => position.symbol.trim().toUpperCase()).filter(Boolean)
        )
      );

      if (uniqueSymbols.length === 0) {
        nextSymbolIndexRef.current = 0;
      } else {
        nextSymbolIndexRef.current = nextSymbolIndexRef.current % uniqueSymbols.length;
      }
    } catch (error) {
      setPriceError(
        error instanceof Error
          ? error.message
          : "Impossible d’enregistrer l’ordre."
      );
    } finally {
      setSavingOrder(false);
    }
  };

  if (!authChecked) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-gray-300">Chargement du portefeuille...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/70">
              Graphique / Simulateur
            </p>
            <h1 className="mt-3 text-4xl font-bold text-yellow-400 md:text-5xl">
              Portefeuille virtuel
            </h1>
            <p className="mt-4 max-w-2xl text-gray-300">
              Commencez avec un capital virtuel, puis ajoutez vos propres ordres pour vous entraîner.
            </p>
            {pageError ? (
              <p className="mt-4 text-sm text-red-400">{pageError}</p>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleResetPortfolio}
            disabled={resettingPortfolio}
            className="inline-flex items-center justify-center rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {resettingPortfolio ? "Réinitialisation..." : "Réinitialiser le portefeuille"}
          </button>
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

        <section className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/8 via-white/5 to-yellow-400/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400/70">
                Realtime premium
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-yellow-400">
                Évolution live du portefeuille
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-400">
                La courbe met à jour un symbole à la fois, de manière équitable, avec une limite adaptée au quota gratuit d’Alpha Vantage.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Valeur live actuelle
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {portfolioValue.toFixed(2)} €
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
                  Variation période
                </p>
                <p
                  className={`mt-2 text-2xl font-semibold ${
                    liveDelta >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {liveDelta >= 0 ? "+" : ""}
                  {liveDelta.toFixed(2)} €
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {liveDelta >= 0 ? "+" : ""}
                  {liveDeltaPercent.toFixed(2)} %
                </p>
              </div>
            </div>
          </div>

          {history.length === 0 ? (
            <p className="mt-6 text-sm text-gray-400">
              Pas encore assez de données pour afficher le graphique.
            </p>
          ) : (
            <div className="mt-8 h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history} margin={{ top: 10, right: 12, left: -12, bottom: 0 }}>
                  <defs>
                    <linearGradient id="investedFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#facc15" stopOpacity={0.42} />
                      <stop offset="50%" stopColor="#facc15" stopOpacity={0.14} />
                      <stop offset="100%" stopColor="#facc15" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="investedStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#fde047" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="rgba(255,255,255,0.08)"
                    vertical={false}
                    strokeDasharray="3 6"
                  />

                  <XAxis
                    dataKey="label"
                    stroke="#9ca3af"
                    tickLine={false}
                    axisLine={false}
                    minTickGap={24}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />

                  <YAxis
                    stroke="#9ca3af"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(value) => `${Number(value).toFixed(0)}€`}
                    width={72}
                  />

                  <Tooltip
                    cursor={{ stroke: "rgba(250,204,21,0.35)", strokeWidth: 1 }}
                    content={<PremiumTooltip />}
                  />

                  <Area
                    type="monotone"
                    dataKey="investedValue"
                    stroke="none"
                    fill="url(#investedFill)"
                    fillOpacity={1}
                    isAnimationActive
                    animationDuration={700}
                  />

                  <Line
                    type="monotone"
                    dataKey="investedValue"
                    stroke="url(#investedStroke)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      fill: "#facc15",
                      stroke: "#0a0a0a",
                      strokeWidth: 3,
                    }}
                    isAnimationActive
                    animationDuration={700}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
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
                disabled={savingOrder || !!pageError}
                className="w-full rounded-xl bg-yellow-400 px-4 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {savingOrder ? "Enregistrement..." : "Valider l’ordre"}
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
                    {positions.map((position, index) => (
                      <tr
                        key={position.id ?? `${position.symbol}-${index}`}
                        className="border-t border-white/10"
                      >
                        <td className="py-4 font-medium text-white">
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

        <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
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