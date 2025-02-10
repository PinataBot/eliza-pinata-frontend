import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pinata AI - Autonomous Sui Trading Agent",
  description: "An AI trading agent on Sui combines on-chain and off-chain components to operate autonomously.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-900">
      <Providers>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
      </Providers>
    </html>
  );
}
