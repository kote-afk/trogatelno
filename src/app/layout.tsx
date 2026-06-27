import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

// Элегантный сериф для заголовков + чистый сан для текста. Кириллица обязательна.
const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}, ${site.city}`,
  description: site.description,
  keywords: [
    "салон красоты",
    "Новосибирск",
    "лазерная эпиляция",
    "косметология",
    "массаж",
    "маникюр",
    site.name,
  ],
  openGraph: {
    title: `${site.name} — ${site.tagline}, ${site.city}`,
    description: site.description,
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
