"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Formulaire envoyé :", formData);

    setIsSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <section className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
            Lion Wall Street
          </p>
          <h1 className="mt-4 text-5xl font-bold text-yellow-400">
            Contact
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Une question, une demande de partenariat ou un besoin spécifique ?
            Écrivez-nous directement via le formulaire ci-dessous.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/10 bg-zinc-900 p-8 shadow-2xl">
          {isSubmitted && (
            <div className="mb-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-4 py-3 text-sm text-yellow-200">
              Votre message a bien été préparé. Il faudra ensuite le relier à un
              vrai système d’envoi email.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Nom complet
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre nom"
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/30 focus:bg-zinc-950"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="vous@email.com"
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/30 focus:bg-zinc-950"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Sujet
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Objet de votre message"
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/30 focus:bg-zinc-950"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                placeholder="Écrivez votre message ici..."
                className="w-full rounded-2xl border border-white/10 bg-black px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-yellow-400/30 focus:bg-zinc-950"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02] hover:bg-yellow-300"
            >
              Envoyer le message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}