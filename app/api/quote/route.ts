import { NextResponse } from "next/server";

const ALPHA_VANTAGE_API_KEY = "HZJBIYKEAPJDHKFD";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get("symbol")?.trim().toUpperCase();

  if (!symbol) {
    return NextResponse.json(
      { error: "Symbole manquant." },
      { status: 400 }
    );
  }

  try {
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${encodeURIComponent(
      symbol
    )}&apikey=${ALPHA_VANTAGE_API_KEY}`;

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Impossible de récupérer le prix." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const quote = data?.["Global Quote"];

    if (!quote) {
      return NextResponse.json(
        { error: "Données introuvables pour ce symbole." },
        { status: 404 }
      );
    }

    const rawPrice = quote["05. price"];
    const price = typeof rawPrice === "string" ? Number(rawPrice) : Number(rawPrice);

    if (!price || Number.isNaN(price)) {
      return NextResponse.json(
        { error: "Prix introuvable ou invalide pour ce symbole." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      symbol,
      price,
      open: quote["02. open"] ?? null,
      high: quote["03. high"] ?? null,
      low: quote["04. low"] ?? null,
      volume: quote["06. volume"] ?? null,
      latestTradingDay: quote["07. latest trading day"] ?? null,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur lors de la récupération du prix." },
      { status: 500 }
    );
  }
}