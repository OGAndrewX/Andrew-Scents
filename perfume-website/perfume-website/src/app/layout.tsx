import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import CartProviderWrapper from './components/CartProviderWrapper';
import CartIcon from './components/CartIcon';
import React from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AM Scents",
  description: "Discover your signature scent with our premium collection of fragrances",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/amscents.ico" />
      </head>
      <body className={inter.className}>
        <CartProviderWrapper>
          <div className="min-h-screen bg-gradient-to-br from-[#d6cfc3] to-[#b3a58c] text-[#2d2a26]">
            <header className="w-full py-4 px-6 flex justify-between items-center bg-[#ede7dd] bg-opacity-80">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="AM Scents Logo" width={48} height={48} className="rounded" />
                <span className="text-2xl font-bold text-[#3a2c1a]">AM Scents</span>
                <span className="mx-3 h-6 border-l border-[#3a2c1a] inline-block align-middle"></span>
                <a href="/" className="text-[#23190e] font-bold text-base hover:underline transition">Home</a>
              </div>
              <CartIcon />
            </header>
            {children}
          </div>
        </CartProviderWrapper>
      </body>
    </html>
  );
}
