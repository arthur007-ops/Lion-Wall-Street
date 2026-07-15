"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import AuthPanel from "./components/AuthPanel";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const displayName = useMemo(() => {
    if (profileName.trim()) return profileName.trim();
    if (profileEmail.trim()) return profileEmail.split("@")[0];
    return "Mon profil";
  }, [profileName, profileEmail]);

  const profileInitials = useMemo(() => {
    const source = profileName.trim() || profileEmail.trim() || "MP";
    return source.slice(0, 2).toUpperCase();
  }, [profileName, profileEmail]);

  const avatarDisplayUrl = useMemo(() => {
    if (!avatarUrl) return "";
    return `${avatarUrl}?t=${Date.now()}`;
  }, [avatarUrl]);

  useEffect(() => {
    const loadUserAndProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(!!user);

      if (user) {
        setProfileEmail(user.email || "");

        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", user.id)
          .single();

        setProfileName(profile?.username || "");
        setAvatarUrl(profile?.avatar_url || "");
      } else {
        setProfileEmail("");
        setProfileName("");
        setAvatarUrl("");
      }

      setCheckingAuth(false);
    };

    loadUserAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoggedIn(!!session?.user);
      setCheckingAuth(false);

      if (session?.user) {
        setProfileEmail(session.user.email || "");

        const { data: profile } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", session.user.id)
          .single();

        setProfileName(profile?.username || "");
        setAvatarUrl(profile?.avatar_url || "");
      } else {
        setProfileEmail("");
        setProfileName("");
        setAvatarUrl("");
      }

      if (event === "SIGNED_IN" && session?.user) {
        setAuthOpen(false);
        router.push("/");
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-8 text-white">
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

      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/logoLWS.png"
            alt="Lion Wall Street"
            width={48}
            height={48}
            priority
            className="h-12 w-12 object-contain"
          />
          <span className="text-sm font-medium uppercase tracking-[0.25em] text-yellow-300 md:text-base">
            Lion Wall Street
          </span>
        </div>

        <div className="flex items-center">
          {!checkingAuth && isLoggedIn ? (
            <Link
              href="/profil"
              className="group inline-flex h-16 items-center gap-3 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-3 pr-5 text-left transition hover:bg-yellow-400/20"
            >
              <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-yellow-400/30 bg-black/20">
                {avatarUrl ? (
                  <img
                    src={avatarDisplayUrl}
                    alt="Photo de profil"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-yellow-300">
                    {profileInitials}
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.22em] text-yellow-300/70">
                  Compte
                </p>
                <p className="truncate text-sm font-semibold text-yellow-200">
                  {displayName}
                </p>
              </div>
            </Link>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="inline-flex h-14 w-32 -translate-y-[10px] items-center justify-center rounded-2xl bg-yellow-400 text-sm font-semibold text-black transition hover:bg-yellow-300"
            >
              Connexion
            </button>
          )}
        </div>
      </header>

      <section className="relative mx-auto mt-16 flex max-w-6xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-full border border-yellow-400/40 px-4 py-2 text-sm text-yellow-300"
        >
          Finance • Investment • Newsletter
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 max-w-4xl text-5xl font-bold text-yellow-400 md:text-7xl"
        >
          Apprenez à faire travailler votre argent avec nous.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-gray-300"
        >
          Lion Wall Street est un univers dédié à la finance, à l’investissement et à l’analyse de marché,
          avec une approche simple, moderne et ambitieuse pour vous apprendres les rouages de la bourse.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.35,
              },
            },
          }}
          className="mt-14 grid w-full max-w-5xl gap-6 md:grid-cols-3"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Marchés</h2>
            <p className="mt-3 text-sm text-gray-300">
              Une lecture des tendances, des mouvements et des signaux importants.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Analyses</h2>
            <p className="mt-3 text-sm text-gray-300">
              Des idées, réflexions et contenus pour mieux comprendre l’investissement.
            </p>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-yellow-400">Newsletter</h2>
            <p className="mt-3 text-sm text-gray-300">
              Un point de contact direct pour partager les actualités et contenus exclusifs.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <AuthPanel open={authOpen} onClose={() => setAuthOpen(false)} />
    </main>
  );
}