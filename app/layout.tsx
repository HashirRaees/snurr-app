import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import "./globals.css";

const evilEmpire = localFont({
  src: "../public/fonts/Evil Empire.woff",
  variable: "--font-evil",
});

export const metadata: Metadata = {
  title: "Snurr | Crypto Casino",
  description: "Play, Earn, Win. The ultimate crypto casino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${evilEmpire.variable}`}>{children}</body>
    </html>
  );
}
