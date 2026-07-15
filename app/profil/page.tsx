"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProfilPage() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      setLoading(true);
      setMessage("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("Utilisateur non connecté.");
        setLoading(false);
        return;
      }

      setUserId(user.id);
      setEmail(user.email || "");

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          const { error: insertError } = await supabase.from("profiles").insert({
            id: user.id,
            username: "",
            avatar_url: "",
          });

          if (insertError) {
            setMessage(insertError.message);
          }
        } else {
          setMessage(error.message);
        }
      } else if (data) {
        setUsername(data.username || "");
        setAvatarUrl(data.avatar_url || "");
      }
    } catch (error: any) {
      setMessage(error.message || "Erreur lors du chargement du profil.");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setSaving(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Utilisateur non connecté.");
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Profil mis à jour avec succès.");
      }
    } catch (error: any) {
      setMessage(error.message || "Erreur lors de la mise à jour.");
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setUploading(true);
      setMessage("");

      const file = e.target.files?.[0];
      if (!file) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setMessage("Utilisateur non connecté.");
        return;
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          upsert: true,
        });

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
      setMessage("Photo uploadée avec succès.");
    } catch (error: any) {
      setMessage(error.message || "Erreur lors de l'upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-900 p-8">
          Chargement du profil...
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
          Mon profil
        </p>

        <h1 className="mt-3 text-3xl font-bold text-yellow-400">
          Espace profil
        </h1>

        <p className="mt-3 text-gray-300">
          Gère ton nom d’utilisateur et ta photo de profil.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="h-28 w-28 overflow-hidden rounded-full border border-yellow-400/30 bg-white/5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Photo de profil"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                Aucune photo
              </div>
            )}
          </div>

          <label className="cursor-pointer rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300 transition hover:bg-yellow-400/20">
            {uploading ? "Upload..." : "Changer la photo"}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">Username</label>
            <input
              type="text"
              placeholder="@lionwallstreet"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/40"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={updateProfile}
            disabled={saving}
            className="w-full rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-5 py-3 text-sm font-medium text-yellow-300 transition hover:bg-yellow-400/20 disabled:opacity-60"
          >
            {saving ? "Enregistrement..." : "Enregistrer le profil"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Se déconnecter
          </button>
        </div>

        {message && (
          <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200">
            {message}
          </div>
        )}
      </section>
    </main>
  );
}