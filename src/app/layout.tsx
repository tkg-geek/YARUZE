import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yaruze.vercel.app'),
  title: "YARUZE - これからやること宣言",
  description: "これからやることを宣言して、SNSでシェアしよう",
  icons: {
    icon: [
      { url: '/favicon-new.ico?v=1', sizes: 'any' },
      { url: '/favicon-16x16.png?v=1', sizes: '16x16' },
      { url: '/favicon-32x32.png?v=1', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=1', sizes: '180x180' },
    ],
    other: [
      { 
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png?v=1',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png?v=1',
        sizes: '512x512',
      },
    ],
  },
  openGraph: {
    title: "YARUZE - これからやること宣言",
    description: "これからやることを宣言して、SNSでシェアしよう",
    type: "website",
    images: [
      {
        url: 'https://yaruze.vercel.app/api/og?title=%E3%82%84%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E5%AE%A3%E8%A8%80%E3%81%99%E3%82%8B%E3%81%9C%EF%BC%81&description=%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%81%AB%E5%BF%9C%E3%81%98%E3%81%A6OGP%E3%81%8C%E7%94%9F%E6%88%90%E3%81%95%E3%82%8C%E3%82%8B%E3%81%9C%EF%BC%81',
        width: 1200,
        height: 630,
        alt: 'YARUZE - これからやること宣言',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YARUZE - これからやること宣言",
    description: "これからやることを宣言して、SNSでシェアしよう",
    images: ['https://yaruze.vercel.app/api/og?title=%E3%82%84%E3%82%8B%E3%81%93%E3%81%A8%E3%82%92%E5%AE%A3%E8%A8%80%E3%81%99%E3%82%8B%E3%81%9C%EF%BC%81&description=%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%81%AB%E5%BF%9C%E3%81%98%E3%81%A6OGP%E3%81%8C%E7%94%9F%E6%88%90%E3%81%95%E3%82%8C%E3%82%8B%E3%81%9C%EF%BC%81'],
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
        {children}
      </body>
    </html>
  );
}
