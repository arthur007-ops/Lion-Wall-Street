"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const MAX_FILE_SIZE_MB = 5;
const AVATAR_BUCKET = "avatar";

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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 22, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

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
            updated_at: new Date().toISOString(),
          });

          if (insertError) {
            setMessage(insertError.message);
            return;
          }

          setUsername("");
          setAvatarUrl("");
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
        username: username.trim(),
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      setMessage("Profil mis à jour avec succès.");
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

      if (!file.type.startsWith("image/")) {
        setMessage("Veuillez sélectionner uniquement une image.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setMessage(`L'image dépasse ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setMessage("Utilisateur non connecté.");
        return;
      }

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const filePath = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(AVATAR_BUCKET)
        .upload(filePath, file, {
          cacheControl: "60",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) {
        setMessage(uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from(AVATAR_BUCKET)
        .getPublicUrl(filePath);

      const publicUrl = publicUrlData.publicUrl;

      setAvatarUrl(publicUrl);

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        username: username.trim(),
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        setMessage(profileError.message);
        return;
      }

      setMessage("Photo de profil mise à jour avec succès.");
    } catch (error: any) {
      setMessage(error.message || "Erreur lors de l'upload.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-black px-6 py-20 text-white">
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

        <section className="relative z-10 mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-900/90 p-8 backdrop-blur-xl">
          Chargement du profil...
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-6 py-20 text-white">
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

      <motion.section
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        className="relative z-10 mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-900/85 p-8 shadow-2xl backdrop-blur-xl"
      >
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.p
            variants={itemVariants}
            className="text-sm uppercase tracking-[0.25em] text-yellow-400/80"
          >
            Mon profil
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="mt-3 text-3xl font-bold text-yellow-400"
          >
            Espace profil
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-3 text-gray-300"
          >
            Gère ton nom d’utilisateur et ta photo de profil.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col items-center gap-4">
            <div className="h-28 w-28 overflow-hidden rounded-full border border-yellow-400/30 bg-white/5">
              {avatarUrl ? (
                <img
                  src={`${avatarUrl}?t=${Date.now()}`}
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

            <p className="text-xs text-gray-400">
              Formats image acceptés, taille maximum {MAX_FILE_SIZE_MB} MB.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 space-y-4">
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

            <div>
              <label className="mb-2 block text-sm text-gray-300">User ID</label>
              <input
                type="text"
                value={userId}
                disabled
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-gray-500 outline-none"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-6 flex flex-col gap-3">
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
          </motion.div>

          {message && (
            <motion.div
              variants={itemVariants}
              className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-200"
            >
              {message}
            </motion.div>
          )}
        </motion.div>
      </motion.section>
    </main>
  );
}