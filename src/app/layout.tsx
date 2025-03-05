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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16' },
      { url: '/favicon-32x32.png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    other: [
      { 
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
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
        url: '/api/og?title=YARUZE',
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
    images: ['/api/og?title=YARUZE'],
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
