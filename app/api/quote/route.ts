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

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Impossible de récupérer le prix.", details: data },
        { status: 502 }
      );
    }

    if (typeof data?.Information === "string") {
      return NextResponse.json(
        { error: data.Information },
        { status: 400 }
      );
    }

    if (typeof data?.Note === "string") {
      return NextResponse.json(
        { error: data.Note },
        { status: 429 }
      );
    }

    if (typeof data?.["Error Message"] === "string") {
      return NextResponse.json(
        { error: data["Error Message"] },
        { status: 400 }
      );
    }

    const quote = data?.["Global Quote"];
    const rawPrice = quote?.["05. price"];
    const price = Number.parseFloat(String(rawPrice ?? ""));

    if (!quote || Object.keys(quote).length === 0) {
      return NextResponse.json(
        { error: "Aucune donnée de cotation retournée par Alpha Vantage." },
        { status: 404 }
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      return NextResponse.json(
        {
          error: "Prix invalide renvoyé par Alpha Vantage.",
          rawPrice: rawPrice ?? null,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      symbol,
      price,
      open: quote["02. open"] ? Number.parseFloat(String(quote["02. open"])) : null,
      high: quote["03. high"] ? Number.parseFloat(String(quote["03. high"])) : null,
      low: quote["04. low"] ? Number.parseFloat(String(quote["04. low"])) : null,
      volume: quote["06. volume"] ? Number.parseInt(String(quote["06. volume"]), 10) : null,
      latestTradingDay: quote["07. latest trading day"] ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur serveur lors de la récupération du prix.",
      },
      { status: 500 }
    );
  }
}