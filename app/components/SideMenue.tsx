"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function SideMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Accueil" },
    { href: "/decouvrir", label: "Découvrir" },
    { href: "/graphique", label: "Graphique" },
    { href: "/synthese", label: "Synthèse" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/nos-articles", label: "Nos Articles" },
  ];

  const isContactActive = pathname === "/contact";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-6 top-6 z-40 rounded-xl border border-yellow-400/30 bg-yellow-400 px-5 py-3 font-semibold text-black shadow-lg transition hover:scale-105 hover:bg-yellow-300"
      >
        Menu
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ${
          open
            ? "pointer-events-auto bg-black/60 backdrop-blur-sm"
            : "pointer-events-none bg-black/0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`h-full w-80 border-l border-white/10 bg-zinc-950 text-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col p-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-yellow-400/80">
                  Lion Wall Street
                </p>
                <h2 className="mt-2 text-2xl font-bold text-yellow-400">
                  Navigation
                </h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-gray-300 transition hover:border-yellow-400/30 hover:bg-yellow-400/10 hover:text-yellow-300"
              >
                Fermer
              </button>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-2xl border px-4 py-3 font-medium transition ${
                      isActive
                        ? "border-yellow-400/30 bg-yellow-400/10 text-yellow-300"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-yellow-400/20 hover:bg-yellow-400/5 hover:text-yellow-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 flex justify-center">
  <Image
    src="/logoLWS.png"
    alt="Logo Lion Wall Street"
    width={72}
    height={72}
    className="h-16 w-16 rounded-full border border-white/10 bg-white/5 p-2 object-contain opacity-95"
  />
</div>

              <div className="border-t border-white/10 pt-5">
                <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-yellow-400/70">
                    Contact
                  </p>
                  <p className="mt-2 text-sm text-gray-300">
                    Une question, une demande ou un partenariat.
                  </p>

                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className={`mt-4 inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                      isContactActive
                        ? "border-yellow-400/30 bg-yellow-400 text-black"
                        : "border-yellow-400/30 bg-yellow-400 text-black hover:bg-yellow-300"
                    }`}
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}