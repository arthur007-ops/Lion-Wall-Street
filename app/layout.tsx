import "./globals.css";
import SideMenue from "./components/SideMenue";

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