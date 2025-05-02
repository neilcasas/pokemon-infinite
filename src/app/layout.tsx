import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PokeDex App",
  description: "Browse and search for your favorite Pokémon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 items-center justify-center flex flex-col py-10 pb-24" // Added pb-24 for toolbar space
        )}
      >
        <Providers>
          <h1 className="text-5xl font-bold mb-10">PokeDex</h1>
          {children}
        </Providers>
      </body>
    </html>
  );
}
