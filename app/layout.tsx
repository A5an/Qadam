import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";
import ClientLayout from "./components/client-layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Qadam",
  description: "Telegram Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive"></Script>
    </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
