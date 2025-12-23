import type { Metadata } from "next";
import React from "react";
import { Space_Grotesk } from "next/font/google"; // Aeonik alternative
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

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
      <body
        className={`${spaceGrotesk.variable} 
         antialiased ${evilEmpire.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
