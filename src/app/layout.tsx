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
  title: "やるぜ！ - これからやること宣言",
  description: "これからやることを宣言して、SNSでシェアしよう",
  openGraph: {
    title: "やるぜ！ - これからやること宣言",
    description: "これからやることを宣言して、SNSでシェアしよう",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "やるぜ！ - これからやること宣言",
    description: "これからやることを宣言して、SNSでシェアしよう",
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
