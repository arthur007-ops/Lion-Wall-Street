"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Connexion réussie.");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "http://localhost:3000/auth/confirm",
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Compte créé. Vérifie ton email pour confirmer ton inscription.");
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
          Espace membre
        </p>

        <h1 className="mt-3 text-3xl font-bold text-yellow-400">
          {isLogin ? "Connexion" : "Créer un compte"}
        </h1>

        <p className="mt-3 text-gray-300">
          {isLogin
            ? "Connectez-vous à votre espace Lion Wall Street."
            : "Créez votre compte pour accéder à l’espace membre."}
        </p>

        <form onSubmit={handleAuth} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/40"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/40"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20 disabled:opacity-60"
          >
            {loading
              ? "Chargement..."
              : isLogin
              ? "Se connecter"
              : "Créer mon compte"}
          </button>
        </form>

        {message && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage("");
          }}
          className="mt-6 text-sm text-yellow-300 underline underline-offset-4"
        >
          {isLogin
            ? "Pas encore de compte ? Créer un compte"
            : "Déjà un compte ? Se connecter"}
        </button>
      </section>
    </main>
  );
}