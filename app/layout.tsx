import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "苫食原価検索システム",
  description: "苫食株式会社 原価検索システム",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
