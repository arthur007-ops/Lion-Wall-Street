import type { Metadata } from "next";
import "./globals.css";
import SideMenue from "./components/SideMenue";

export const metadata: Metadata = {
  title: {
    default: "Lion Wall Street",
    template: "%s | Lion Wall Street",
  },
  description: "Plateforme boursière avec graphiques et simulateur de portefeuille.",
  icons: {
    icon: "/logoLWS.png",
    shortcut: "/logoLWS.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-black">
      <body className="min-h-screen bg-black text-white">
        <SideMenue />
        {children}
        {modal}
      </body>
    </html>
  );
}