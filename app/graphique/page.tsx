import { Suspense } from "react";
import GraphiqueClient from "./GraphiqueClient";

export default function GraphiquePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-6 py-20 text-white">
          <section className="mx-auto max-w-5xl">
            <h1 className="text-center text-5xl font-bold text-yellow-400">
              Graphique
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-gray-300">
              Chargement du graphique...
            </p>
          </section>
        </main>
      }
    >
      <GraphiqueClient />
    </Suspense>
  );
}