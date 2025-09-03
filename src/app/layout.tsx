import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MYP Tickets - Suporte e Abertura de Solicitações",
  description:
    "Abra e acompanhe seus tickets de suporte de forma simples e rápida com o MyP Tickets.",
  keywords: [
    "tickets",
    "suporte",
    "ajuda",
    "chamados",
    "atendimento",
    "MyP Tickets",
  ],
  openGraph: {
    title: "MyP Tickets - Suporte e Abertura de Solicitações",
    description:
      "Gerencie facilmente seus tickets de suporte e receba atendimento rápido.",
    url: "https://tickets.mypessoal.com", // 🔹 substitua pelo domínio real
    siteName: "MyP Tickets",
    images: [
      {
        url: "/myp-short-logo.png", // 🔹 imagem usada no preview do WhatsApp
        width: 1200,
        height: 630,
        alt: "MyP Tickets",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyP Tickets - Suporte e Abertura de Chamados",
    description:
      "Abra e acompanhe tickets de suporte com facilidade no MyP Tickets.",
    images: ["/myp-short-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`bg-slate-100 ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
