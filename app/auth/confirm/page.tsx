"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type ConfirmPageProps = {
  searchParams: Promise<{
    token_hash?: string;
    type?: string;
  }>;
};

export default async function ConfirmEmailPage({ searchParams }: ConfirmPageProps) {
  const params = await searchParams;
  const tokenHash = params.token_hash;
  const type = params.type;

  return <ConfirmEmailClient tokenHash={tokenHash} type={type} />;
}

function ConfirmEmailClient({
  tokenHash,
  type,
}: {
  tokenHash?: string;
  type?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const isValidLink = !!tokenHash && !!type;

  const handleConfirm = async () => {
    if (!tokenHash || !type) {
      setMessage("Lien invalide ou incomplet.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as "signup" | "recovery" | "invite" | "email" | "email_change",
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setConfirmed(true);
    setMessage("Votre email a bien été confirmé. Vous pouvez maintenant vous connecter.");

    setTimeout(() => {
      router.push("/test-supabase");
    }, 2000);

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center shadow-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
          Confirmation
        </p>

        <h1 className="mt-3 text-3xl font-bold text-yellow-400">
          Confirmer votre compte
        </h1>

        <p className="mt-4 text-gray-300">
          Cliquez sur le bouton ci-dessous pour valider votre adresse email.
        </p>

        {!isValidLink && (
          <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm text-red-200">
            Lien invalide. Vérifiez que vous avez bien ouvert le lien reçu par email.
          </div>
        )}

        {message && (
          <div
            className={`mt-6 rounded-2xl p-4 text-sm ${
              confirmed
                ? "border border-green-400/20 bg-green-400/10 text-green-200"
                : "border border-white/10 bg-white/5 text-gray-200"
            }`}
          >
            {message}
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!isValidLink || loading || confirmed}
          className="mt-8 inline-flex rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-6 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Confirmation..."
            : confirmed
            ? "Compte confirmé"
            : "Confirmer mon compte"}
        </button>
      </section>
    </main>
  );
}