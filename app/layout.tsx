import type { ReactNode } from "react";

export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal?: ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        {modal ?? null}
      </body>
    </html>
  );
}