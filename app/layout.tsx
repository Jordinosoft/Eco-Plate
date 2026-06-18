import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FoodLoop — Rescue Food. Protect the Planet.",
  description:
    "A circular food marketplace connecting surplus food from restaurants to rescuers and NGOs across Cameroon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
