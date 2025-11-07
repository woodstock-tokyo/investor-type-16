import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "インベスタータイプ16 - あなたの投資スタイル診断",
  description: "4つの軸から16タイプに分類。あなたに最適な投資戦略を見つけましょう。",
  openGraph: {
    type: "website",
    title: "インベスタータイプ16 - あなたの投資スタイル診断",
    description: "4つの軸から16タイプに分類。あなたに最適な投資戦略を見つけましょう。",
    images: [
      {
        url: "/image/ogp.png",
        width: 1200,
        height: 630,
        alt: "インベスタータイプ16",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "インベスタータイプ16 - あなたの投資スタイル診断",
    description: "4つの軸から16タイプに分類。あなたに最適な投資戦略を見つけましょう。",
    images: ["/image/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
