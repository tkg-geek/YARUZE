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
  title: "YARUZE - これからやること宣言",
  description: "これからやることを宣言して、SNSでシェアしよう",
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
