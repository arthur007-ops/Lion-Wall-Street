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
    shortcut: "/ogoLWS.png",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <SideMenue />
        {children}
      </body>
    </html>
  );
}