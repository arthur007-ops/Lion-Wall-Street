"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function AuthPage() {
  const router = useRouter();

  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log(
    "SUPABASE KEY START:",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20)
  );
  console.log("SITE URL:", siteUrl);

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        router.push("/");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const cleanEmail = email.trim();

      console.log("Before auth call - URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log(
        "Before auth call - KEY START:",
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 20)
      );
      console.log("SITE URL:", siteUrl);
      console.log("Mode:", isLogin ? "login" : "signup");
      console.log("Email:", cleanEmail);

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

        console.log("signIn data:", data);
        console.error("signIn error:", error);

        if (error) {
          setMessage(error.message || "Erreur lors de la connexion.");
        } else {
          setMessage("Connexion réussie.");
          router.push("/");
          router.refresh();
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: `${siteUrl}/auth/confirm`,
          },
        });

        console.log("signUp data:", data);
        console.error("signUp error:", error);

        if (error) {
          setMessage(error.message || "Erreur lors de la création du compte.");
        } else if (data?.user && !data?.session) {
          setMessage("Compte créé. Vérifie ton email pour confirmer ton inscription.");
        } else {
          setMessage("Compte créé avec succès.");
          router.push("/");
          router.refresh();
        }
      }
    } catch (err: any) {
      console.error("Unexpected auth error:", err);
      setMessage(err?.message || "Une erreur inattendue est survenue.");
    } finally {
      setLoading(false);
    }
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
            setEmail("");
            setPassword("");
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